import React, {useEffect, useRef} from 'react';
import EmojiPicker from './EmojiPicker';
import { DiaryEntry } from '../page';

interface ListItemProps {
    diary: DiaryEntry;
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

const ListItem: React.FC<ListItemProps> = ({ diary, editingDiaryId, editDateInput, handleEditDateChange, editTextInput, handleEditTextChange, handleEditFormSubmit, cancelEditing, editDiary, deleteDiary}) => {

    console.log("component");


    return (
        <div className="diary-item bg-transparent flex flex-col md:flex-row border-solid border-2 border-sky-300 my-4 md:m-6 py-4 px-4 rounded-2xl">
            {editingDiaryId === diary.id ? (
                <form onSubmit={handleEditFormSubmit}>
                    <div className="diary-date"><input
                        className="py-2 px-2 border-2 border-blue-400 rounded-md outline-none focus:border-blue-600" type="date"
                        value={editDateInput} onChange={handleEditDateChange}/></div>
                    <div className="diary-text" onClick={() => {console.log("clicked!")}}><input
                        className="py-2 px-2 border-2 border-blue-400 rounded-md outline-none focus:border-blue-600" type="text"
                        value={editTextInput} onChange={handleEditTextChange} onFocus={() => {console.log("input focused!")}}/></div>
                    <div className="diary-action justify-between w-full">
                        <button className="py-1 md:py-2 px-2 md:px-4 bg-blue-200 border-2 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                type='submit'>저장
                        </button>
                        <button className="py-1 md:py-2 px-2 md:px-4 bg-blue-200 border-2 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                type="button" onClick={cancelEditing}>취소
                        </button>
                    </div>
                </form>
            ) : (
                <>
                    <div className="diary-date">
                        <p className="text-base md:text-lg">{diary.date}</p>
                    </div>
                    <div className="diary-text flex flex-col">
                        <p className="my-1 text-xl md:text-2xl">{diary.text}</p>
                    </div>
                    <div className="diary-action justify-between w-full">
                        <button className="py-1 md:py-2 px-2 md:px-4 border-2 bg-blue-200 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                onClick={() => editDiary(diary.id)}>수정
                        </button>
                        <button className="py-1 md:py-2 px-2 md:px-4 border-2 bg-blue-200 border-blue-300 rounded-md hover:bg-blue-400 hover:border-blue-500 hover:text-white"
                                onClick={() => deleteDiary(diary.id)}>삭제
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ListItem;
