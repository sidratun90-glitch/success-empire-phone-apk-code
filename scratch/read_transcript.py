import json

path = r"C:\Users\HP\.gemini\antigravity-ide\brain\1581b616-3d13-4d3e-b797-c2f4825cfa33\.system_generated\logs\transcript.jsonl"
with open(path, "r", encoding="utf-8") as f:
    for line in f:
        if '"type":"USER_INPUT"' in line:
            try:
                data = json.loads(line)
                print("--- USER MSG ---")
                print(data.get("content"))
            except Exception as e:
                pass
