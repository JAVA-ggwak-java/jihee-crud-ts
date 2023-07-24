import React, { RefObject } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data'

interface EmojiProps {
    emoticons: string[];
    id: string;
    keywords: string[];
    name: string;
    native: string;
    shortcodes: string;
    unified: string;
}

interface EmojiPickerProps {
    showEmojiPicker: boolean;
    emojiPickerRef: RefObject<HTMLDivElement>;
    onEmojiSelect: (emoji: string, id: number) => void;
    diaryId: number;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ showEmojiPicker, emojiPickerRef, onEmojiSelect, diaryId }) => {

    return showEmojiPicker ? (
        <div className="absolute top-full z-10" ref={emojiPickerRef}>
            <Picker data={data} onEmojiSelect={(emoji : EmojiProps) => onEmojiSelect(emoji.native, diaryId)}/>
        </div>
    ) : null;
}

export default EmojiPicker;
