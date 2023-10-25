#!/bin/bash

# Set the directory containing your videos and subtitles
# Assuming the 'input' directory is in the same location as your script
script_directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
source_directory="$script_directory/input"

# Loop through each .mp4 file in the source directory
for f in "$source_directory"/*.mp4
do
  # Get the filename without the extension
  filename=$(basename -- "$f")
  filename="${filename%.*}"

  # Set the paths for the current video and subtitle file
  input_video="$source_directory/$filename.mp4"
  input_subtitle="$source_directory/$filename.srt"
  output_video="$source_directory/${filename}_subtitled.mp4"

  # Check if subtitle file exists for the video
  if [ -e "$input_subtitle" ]; then
    echo "Processing $input_video"

    # Run FFmpeg with subtitle encoding
   #  ffmpeg -i "$input_video" -vf "subtitles='$input_subtitle':force_style='BackgroundColor=0x00000000,BorderStyle=4,Fontsize=16,PrimaryColour=&HFFFFFF'" -c:v libx264 -crf 23 -preset veryfast -c:a copy "$output_video"
ffmpeg -i "$input_video" -vf "subtitles='$input_subtitle':force_style='FontName=Arial,FontSize=18,PrimaryColour=&HFFFFFF,SecondaryColour=&H000000,OutlineColour=&H000000,BackColour=&H000000,Outline=1,Shadow=1,BorderStyle=3,MarginV=20'" -c:v libx264 -crf 5 -preset slower -c:a copy "$output_video"

    echo "Processed $output_video"
  else
    echo "No subtitle file found for $input_video"
  fi
done

echo "All videos processed."
