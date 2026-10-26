import json

path = r"C:\Users\HP\.gemini\antigravity-ide\brain\1581b616-3d13-4d3e-b797-c2f4825cfa33\.system_generated\logs\transcript.jsonl"
with open(path, "r", encoding="utf-8") as f:
    for line in f:
        if "PACKAGE_ENROLL_LINKS" in line or "buy-package" in line:
            data = json.loads(line)
            content = data.get("content", "")
            # check tool calls
            calls = data.get("tool_calls", [])
            for c in calls:
                if "buy-package" in str(c):
                    print("CALL:", str(c)[:500])
                    break
