'use client' // 리액스 새 버전부터 서버 컴포넌트 도입(서버 렌더링(바로 서버 리소스 접근) 가능) 클라이언트에서 사용하는 useState, useEffect, useRef 는 불가능,
             // 따라서 현재 컴포넌트를 클라이언트 컴포넌트로 바꾼다!

import Image from 'next/image'
import './globals.css';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    interface DiaryEntry {
        id: number;
        date: string;
        text: string;
    }

    const createDiary = (date: string, text: string) : DiaryEntry => ({
        id: Date.now(),
        date,
        text,
    });

    const addDiary = (date: string, text: string) => {
        const newDiary = createDiary(date, text);
        setDiaries([...diaries, newDiary]);
    };

    const today = new Date(); // YYYY-MM-DD 형식을 padStart() 로 맞추자!
    const dateToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    const [dateInput, setDateInput] = useState(dateToday);
    const [textInput, setTextInput] = useState('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateInput(event.target.value);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
    };

    const [editingDiaryId, setEditingDiaryId] = useState<number | null>(null);
    const [editDateInput, setEditDateInput] = useState('');
    const [editTextInput, setEditTextInput] = useState('');

    const handleEditDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditDateInput(event.target.value);
    };

    const handleEditTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTextInput(event.target.value);
    };

    const editDiary = (id: number) => {
        const diaryToEdit = diaries.find(diary => diary.id === id);
        if (diaryToEdit) {  // find 메서드가 undefined 를 반환할 수 있으므로 체크
            setEditDateInput(diaryToEdit.date);
            setEditTextInput(diaryToEdit.text);
        }
        setEditingDiaryId(id);
    };

    const cancelEditing = () => {
        setEditingDiaryId(null);
    };

    const updateDiary = (id: number | null, date: string, text: string) => {
        if (id !== null) { // id가 null 이 아닌 경우 업데이트
            setDiaries(diaries.map(diary =>
                diary.id === id ? {...diary, date, text} : diary
            ));
            setEditingDiaryId(null);
        }
    };

    const handleEditFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editingDiaryId !== null && editDateInput && editTextInput) {
            updateDiary(editingDiaryId, editDateInput, editTextInput);
        }
        if (snackbarTimeoutId.current) {
            clearTimeout(snackbarTimeoutId.current);
        }
        setShowSnackbar('edit');
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar('');
        }, 2500);
    };


    const deleteDiary = (id: number) => {
        setDiaries(diaries.filter(diary => diary.id !== id));
    };

    const [showSnackbar, setShowSnackbar] = useState('');
    const snackbarTimeoutId = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
            }
        };
    }, []);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Hi!");
        if (dateInput && textInput) {
            addDiary(dateInput, textInput);
            setDateInput(dateToday);
            setTextInput('');
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
            }
            setShowSnackbar('success');
        } else {
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
            }
            setShowSnackbar('error');
        }
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar('');
        }, 2500);
    };

  return (
      <main className="App bg-blue-100 min-h-screen flex flex-col justify-center items-center space-y-5">
        <div>
          <h1 className="text-4xl text-blue-600">오늘의 일기</h1>
        </div>
        <div className="input-section border-solid border-2 border-sky-400 py-4 px-8 rounded-2xl">
          <form className="input-form" onSubmit={handleFormSubmit}>
            <input className="py-2 px-4 border-2 border-blue-400 rounded-md"  placeholder={'Enter date'} type="date" value={dateInput} onChange={handleDateChange}/>
            <input className="py-2 px-4 border-2 border-blue-400 rounded-md" placeholder={'Enter text'} type="text" value={textInput} onChange={handleTextChange}/>
            <button className="py-2 px-4 bg-blue-200 border-2 border-blue-300 rounded-md" type="submit">완료</button>
          </form>
          {showSnackbar === 'success' &&
              <div className={`bg-green-500/75 snackbar ${showSnackbar ? 'show' : ''}`}>항목을 추가했어요!</div>}
          {showSnackbar === 'edit' &&
              <div className={`bg-blue-500/75 snackbar ${showSnackbar ? 'show' : ''}`}>항목을 수정했어요!</div>}
          {showSnackbar === 'error' &&
              <div className={`bg-red-500/75 snackbar ${showSnackbar ? 'show' : ''}`}>값을 입력해주세요!</div>}
        </div>
        <div className="list-section w-9/12">
          {diaries.map(diary => (
              <div key={diary.id} className="diary-item bg-transparent border-solid border-2 border-sky-300 m-4 py-4 px-8 rounded-2xl">
                {editingDiaryId === diary.id ? (
                    <>
                      <div className="diary-date"><input className="py-1 px-2 border-2 border-blue-400 rounded-md" type="date" value={editDateInput} onChange={handleEditDateChange}/></div>
                      <div className="diary-text"><input className="py-1 px-2 border-2 border-blue-400 rounded-md" type="text" value={editTextInput} onChange={handleEditTextChange}/></div>
                      <div className="diary-action justify-between w-full">
                        <button className="py-2 px-4 bg-blue-200 border-2 border-blue-300 rounded-md" type="submit" onClick={event => handleEditFormSubmit}>저장</button>
                        <button className="py-2 px-4 bg-blue-200 border-2 border-blue-300 rounded-md" type="button" onClick={cancelEditing}>취소</button>
                      </div>
                    </>
                ) : (
                    <>
                      <div className="diary-date">{diary.date}</div>
                      <div className="diary-text">{diary.text}</div>
                      <div className="diary-action justify-between w-full">
                        <button className="py-1 px-2 bg-blue-200 border-2 border-blue-300 rounded-md" onClick={() => editDiary(diary.id)}>수정</button>
                        <button className="py-1 px-2 bg-blue-200 border-2 border-blue-300 rounded-md" onClick={() => deleteDiary(diary.id)}>삭제</button>
                      </div>
                    </>
                )}
              </div>
          ))}
        </div>
      </main>
  )
}
