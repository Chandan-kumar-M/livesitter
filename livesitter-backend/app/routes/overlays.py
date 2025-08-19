from flask import Blueprint, request, jsonify
from bson import ObjectId
from ..database import get_db
from ..models import serialize_overlay

overlay_bp = Blueprint('overlays', __name__)

@overlay_bp.route('/', methods=['GET'])
def list_overlays():
    stream_id = request.args.get('streamId')
    query = {"streamId": stream_id} if stream_id else {}
    overlays = list(get_db().overlays.find(query))
    return jsonify([serialize_overlay(o) for o in overlays])

@overlay_bp.route('/', methods=['POST'])
def create_overlay():
    data = request.json
    result = get_db().overlays.insert_one(data)
    doc = get_db().overlays.find_one({"_id": result.inserted_id})
    return jsonify(serialize_overlay(doc)), 201

@overlay_bp.route('/<id>', methods=['PUT'])
def update_overlay(id):
    data = request.json
    get_db().overlays.update_one({"_id": ObjectId(id)}, {"$set": data})
    doc = get_db().overlays.find_one({"_id": ObjectId(id)})
    return jsonify(serialize_overlay(doc))

@overlay_bp.route('/<id>', methods=['DELETE'])
def delete_overlay(id):
    get_db().overlays.delete_one({"_id": ObjectId(id)})
    return jsonify({"status": "deleted"})
