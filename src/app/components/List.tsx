import React from 'react';
import ListItem from './ListItem';
import { DiaryEntry } from '../page';

interface ListProps {
    diaries: DiaryEntry[];
    editingDiaryId: number | null;
    editDateInput: string;
    handleEditDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    editTextInput: string;
    handleEditTextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleEditFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    cancelEditing: () => void;
    toggleEmojiPicker: (id: number) => void;
    showEmojiPickerId: number | null;
    handleEmojiSelect: (emoji: string, id: number) => void;
    resetEmoji: (id: number) => void;
    editDiary: (id: number) => void;
    deleteDiary: (id: number) => void;
    setShowEmojiPickerId: (id: number | null) => void;
}

const List: React.FC<ListProps> = ({ diaries, editingDiaryId, editDateInput, handleEditDateChange, editTextInput, handleEditTextChange, handleEditFormSubmit, cancelEditing, toggleEmojiPicker, showEmojiPickerId, handleEmojiSelect, resetEmoji, editDiary, deleteDiary, setShowEmojiPickerId }) => {
    return (
        <div className="list-section w-9/12">
            {diaries.map(diary => (
                <ListItem
                    key={diary.id}
                    diary={diary}
                    editingDiaryId={editingDiaryId}
                    editDateInput={editDateInput}
                    handleEditDateChange={handleEditDateChange}
                    editTextInput={editTextInput}
                    handleEditTextChange={handleEditTextChange}
                    handleEditFormSubmit={handleEditFormSubmit}
                    cancelEditing={cancelEditing}
                    toggleEmojiPicker={toggleEmojiPicker}
                    showEmojiPickerId={showEmojiPickerId}
                    setShowEmojiPickerId={setShowEmojiPickerId}
                    handleEmojiSelect={handleEmojiSelect}
                    resetEmoji={resetEmoji}
                    editDiary={editDiary}
                    deleteDiary={deleteDiary}
                />
            ))}
        </div>
    );
}

export default List;