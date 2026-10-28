import json


def complete_task(task_id):
    with open("tasks.json") as f:
        tasks = json.load(f)
    for task in tasks:
        if task["id"] == task_id:
            task["done"] = True
            with open("tasks.json", "w") as f:
                json.dump(tasks, f, indent=2)
            return True
    return False
