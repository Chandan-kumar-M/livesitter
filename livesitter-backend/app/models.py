# Overlay schema helper

def serialize_overlay(doc):
    return {
        "id": str(doc["_id"]),
        "streamId": doc.get("streamId"),
        "type": doc.get("type"),
        "text": doc.get("text"),
        "src": doc.get("src"),
        "x": doc.get("x"),
        "y": doc.get("y"),
        "width": doc.get("width"),
        "height": doc.get("height"),
        "fontSize": doc.get("fontSize"),
        "color": doc.get("color"),
        "opacity": doc.get("opacity"),
        "rotation": doc.get("rotation"),
    }
