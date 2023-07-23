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
    editDiary: (id: number) => void;
    deleteDiary: (id: number) => void;
}

const List: React.FC<ListProps> = ({ diaries, editingDiaryId, editDateInput, handleEditDateChange, editTextInput, handleEditTextChange, handleEditFormSubmit, cancelEditing, editDiary, deleteDiary}) => {
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
                    editDiary={editDiary}
                    deleteDiary={deleteDiary}
                />
            ))}
        </div>
    );
}

export default List;
