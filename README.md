# Automated Subtitle Embedder for Windows

This project provides a batch script to automatically embed subtitles into videos using FFmpeg on Windows.

## Prerequisites

### 1. Install FFmpeg on Windows

- Download FFmpeg from the [official website](https://ffmpeg.org/download.html).
- Extract the downloaded ZIP file. You should now have a folder like `ffmpeg-4.x.x-win64-static`.
- Rename the folder to simply `ffmpeg` for easier access.
- Move this `ffmpeg` folder to `C:\`. So, it should be `C:\ffmpeg\`.
- Add `C:\ffmpeg\bin` to your system's PATH:
    1. Right-click on the `Start` button and select `System`.
    2. Click on `Advanced system settings`.
    3. Click the `Environment Variables` button.
    4. Under `System Variables`, locate the `Path` variable and click `Edit`.
    5. Click `New` and add the path `C:\ffmpeg\bin`.
    6. Press `OK` to save your changes.

### 2. Prepare Video and Subtitle Files

- Make a folder where you'll keep the script, videos, and subtitles. Let's name it `SubtitleProject`.
- Inside `SubtitleProject`, create another folder named `input`. Put all your `.mp4` videos and their corresponding `.srt` subtitle files here. Ensure each video and its respective subtitle have identical names (e.g., `video1.mp4` and `video1.srt`).

## Setup

1. Inside the `SubtitleProject` directory, create a new text document and rename it to `addSubtitles.bat`.
2. Edit `addSubtitles.bat` (right-click and choose `Edit`). This should open the file in Notepad.
3. Copy and paste the provided batch script into this file.
4. Save and exit the file.

## Usage

1. Open Command Prompt (`cmd`) as administrator.
2. Navigate to the `SubtitleProject` folder:

    ```bash
    cd path\to\SubtitleProject
    ```

    Replace `path\to\SubtitleProject` with your actual path.

3. Run the script:

    ```bash
    addSubtitles.bat
    ```

4. The script will process each video in the `input` folder. If a corresponding `.srt` subtitle file is present, it will embed the subtitles into the video. The output video will have `_subtitled` added to its name (e.g., `video1_subtitled.mp4`).

5. The script will notify you about its progress in the Command Prompt, such as when it's processing a video or if a subtitle file isn't found for a particular video.

6. Once completed, it will display "All videos processed."

## Verification

1. Check the `input` folder in `SubtitleProject`.
2. You'll see the original videos, subtitle files, and the new videos with the embedded subtitles.
3. Play one of the subtitled videos to ensure the subtitles are correctly embedded.
