
import re
import json

def extract_data():
    try:
        with open('petnight_search.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Look for the pattern containing initialMapList
        # The pattern in the file looks like: "initialMapList":{"business":[...]}
        # It's inside a string in a script, so we might need to be careful with escaping.
        # However, looking at the grep output, it seems to be part of a larger JSON structure pushed to __next_f.
        
        # Let's try to find the specific JSON object starting with initialMapList
        match = re.search(r'("initialMapList":\{.*?\})\}\]', content)
        if match:
            # We found the part, but it might be somewhat raw.
            # actually the pattern is inside `self.__next_f.push([1,"..."])` where ... is a string that CONTAINS the json.
            # And that string might have escaped quotes.
            
            # Let's try a simpler approach: extract the chunk containing "initialMapList"
            # The structure in the file is: ... "initialMapList":{"business":[{"uuid": ... }]} ...
            
            # We can try to extract the JSON object for initialMapList directly.
            # It starts with {"initialMapList": ...
            # But since it's inside a string, it might be escaped like \"initialMapList\".
            
            # Let's look for the raw string in the file first to be sure.
            pass

        # Alternative strategy:
        # The data is in a line that starts with `self.__next_f.push([1,"6:[`
        # and ends with `"]` (roughly).
        # Inside it, there is `initialMapList`.
        
        # Let's find the specific substring.
        # pattern: strictly match `\"initialMapList\":{` and then capture until the matching closing brace.
        # Since it's nested, regex is hard.
        
        # But looking at the file view, it seems to be a valid JSON fragment if we clean it up.
        # The segment is: "initialMapList":{"business":[ ... ]}
        
        # Let's try to grab everything between `\"initialMapList\":` and the end of the business array.
        
        # A robust way is to find the start index of `initialMapList` and walk forward to balance braces.
        # However, since it is inside a JS string, it is heavily escaped: \"uuid\" etc.
        # We need to unescape it first?
        # Actually, in the file view, it looks like: `\"initialMapList\":{\"business\":[{\"uuid\":\"...`
        
        # So:
        # 1. Find the string literal in the JS.
        # 2. Unescape it (json.loads formatted string).
        # 3. Parse the result.

        # The line containing the data is:
        # self.__next_f.push([1,"6:[\"$\",\"$19\",null,{\"fallback\":[\"$\",\"$L1a\",null,{}],\"children\":[[\"$\",\"$L1b\",null,{\"jsonString\":\"$1c\"}],[\"$\",\"$L1d\",null,{\"initialMapList\":{\"business\":[...
        
        # So we can look for the string starting with `6:[` and parse *that* as a string first? 
        # No, the `self.__next_f.push` receives an array. The second element is a string.
        # That string contains the data.
        
        # Let's regex for `self.__next_f.push\(\[1,"(.*)"\]\)` where the group contains `initialMapList`.
        
        lines = content.splitlines()
        target_line = None
        for line in lines:
            if 'initialMapList' in line:
                target_line = line
                break
        
        if not target_line:
            print("Could not find line with initialMapList")
            return

        # usage of `self.__next_f.push`
        # exact format in file: `self.__next_f.push([1,"..."])`
        # We want the content inside the quotes.
        
        # simple slice might be easier if we know the markers
        start_marker = 'initialMapList\\":' # escaped quote because it is inside a string
        if start_marker not in target_line:
             start_marker = 'initialMapList":' # maybe not escaped?
        
        # In the `view_file` output:
        # `6:[\"$\",\"$19\",null, ... \"initialMapList\":{\"business\":[ ...`
        
        # So it IS escaped.
        # Let's exact the whole string passed to push array.
        
        # The line looks like: `self.__next_f.push([1,"..."])`
        # Regex: `self\.__next_f\.push\(\[1,"(.*)"\]\)`
        # Note: the string inside might contain `"` escaped as `\"`.
        
        match = re.search(r'self\.__next_f\.push\(\[1,"(.*?)"\]\)', target_line)
        if match:
            # We got the inner content of the string.
            inner_str = match.group(1)
            
            # This inner string is ITSELF a serialized format (Next.js flight data?)
            # But `initialMapList` seems to be just a JSON object field within it.
            # And since it was inside `"..."`, the quotes inside it are `\"`.
            # So `inner_str` has `\"initialMapList\"`.
            
            # We can unescape this string to get the "real" structure.
            # `inner_str` is a string literal.
            # But wait, Python's `match.group(1)` gives us the raw characters. 
            # If the file has `\"`, `group(1)` will have `\"`.
            # We need to unescape it: `.replace('\\"', '"').replace('\\\\', '\\')` etc.
            # Or use `codecs.decode(inner_str, 'unicode_escape')`.
            
            unescaped = inner_str.replace('\\"', '"') # Simple unescape for quotes
            
            # Now we look for `initialMapList":{"business":[...]}`
            # We can regex this from the unescaped string.
            
            data_match = re.search(r'"initialMapList":(\{.*?\})\}\]', unescaped)
            # The closing pattern `}]` might be tricky if nested.
            # But the business list ends with `]`. And `initialMapList` value object ends with `}`.
            
            # Let's use a JSON parser if possible.
            # The `unescaped` string is NOT valid JSON itself (it has special Next.js syntax like `["$","..."]`).
            # But we can try to extract the object.
            
            start_idx = unescaped.find('"initialMapList":')
            if start_idx == -1:
                print("Could not find initialMapList in unescaped string")
                return

            # Advance to the value
            json_start = start_idx + len('"initialMapList":')
            
            # Now we need to balance braces to find the end of this object.
            brace_count = 0
            in_string = False
            json_end = -1
            
            for i in range(json_start, len(unescaped)):
                char = unescaped[i]
                if char == '"' and unescaped[i-1] != '\\':
                    in_string = not in_string
                
                if not in_string:
                    if char == '{':
                        brace_count += 1
                    elif char == '}':
                        brace_count -= 1
                        if brace_count == 0:
                            json_end = i + 1
                            break
            
            if json_end != -1:
                json_str = unescaped[json_start:json_end]
                data = json.loads(json_str)
                
                with open('funeral_homes.json', 'w', encoding='utf-8') as outfile:
                    json.dump(data, outfile, indent=2, ensure_ascii=False)
                print(f"Successfully extracted {len(data.get('business', []))} records.")
            else:
                print("Could not find end of JSON object")
        else:
            print("Regex did not match the line structure")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    extract_data()
