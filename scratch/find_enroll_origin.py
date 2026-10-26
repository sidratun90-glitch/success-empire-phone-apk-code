import json

path = r"C:\Users\HP\.gemini\antigravity-ide\brain\1581b616-3d13-4d3e-b797-c2f4825cfa33\.system_generated\logs\transcript.jsonl"
with open(path, "r", encoding="utf-8") as f:
    for line in f:
        if "placeholder-link-standard" in line:
            data = json.loads(line)
            calls = data.get("tool_calls", [])
            for c in calls:
                args = c.get("args", {})
                if "placeholder-link" in str(args):
                    print("TargetContent:", args.get("TargetContent"))
                    print("ReplacementContent:", args.get("ReplacementContent"))
