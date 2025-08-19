#!/bin/bash
# Example script to convert RTSP stream to HLS using FFmpeg
# Usage: ./ffmpeg_stream.sh rtsp://your-camera-url output_folder

RTSP_URL=$1
OUTPUT_DIR=$2

mkdir -p $OUTPUT_DIR

ffmpeg -i $RTSP_URL \
  -c:v libx264 -preset ultrafast -crf 20 \
  -c:a aac -f hls \
  -hls_time 2 -hls_list_size 10 -hls_flags delete_segments \
  $OUTPUT_DIR/stream.m3u8
