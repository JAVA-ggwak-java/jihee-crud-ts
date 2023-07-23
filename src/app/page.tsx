'use client' // 리액스 새 버전부터 서버 컴포넌트 도입(서버 렌더링(바로 서버 리소스 접근) 가능) 클라이언트에서 사용하는 useState, useEffect, useRef 는 불가능,
             // 따라서 현재 컴포넌트를 클라이언트 컴포넌트로 바꾼다!

import './globals.css';
import React, {useState, useEffect, useRef} from 'react';
import Snackbar from './components/Snackbar';
import Form from './components/Form';
import List from './components/List';

export interface DiaryEntry {
    id: number;
    date: string;
    text: string;
}

export default function Home(){
    const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

    const createDiary = (date: string, text: string): DiaryEntry => ({
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

    const [dateInput, setDateInput] = useState<string>(dateToday);
    const [textInput, setTextInput] = useState('');

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateInput(event.target.value);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextInput(event.target.value);
    };

    const [editingDiaryId, setEditingDiaryId] = useState<number | null>(null);
    const [editDateInput, setEditDateInput] = useState<string>('');
    const [editTextInput, setEditTextInput] = useState<string>('');

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
            setShowSnackbar(false);
        }
        setTimeout(() => {
            setMessage('edit');
            setShowSnackbar(true);
        }, 50)
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar(false);
        }, 2500);
    };


    const deleteDiary = (id: number) => {
        setDiaries(diaries.filter(diary => diary.id !== id));
        if (snackbarTimeoutId.current) {
            clearTimeout(snackbarTimeoutId.current);
            setShowSnackbar(false);
        }
        setTimeout(() => {
            setMessage('delete');
            setShowSnackbar(true);
        }, 50);
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar(false);
        }, 2500);
    };

    const [showSnackbar, setShowSnackbar] = useState<null | boolean>(false);
    const snackbarTimeoutId = useRef<NodeJS.Timeout | null>(null);
    const [message, setMessage] = useState<string>('');

    useEffect(() => {
        return () => {
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
            }
        };
    }, []);

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (dateInput && textInput) {
            addDiary(dateInput, textInput);
            setDateInput(dateToday);
            setTextInput('');
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
                setShowSnackbar(false);
            }
            setTimeout(() => {
                setMessage('success');
                setShowSnackbar(true);
            }, 50);
        } else {
            if (snackbarTimeoutId.current) {
                clearTimeout(snackbarTimeoutId.current);
                setShowSnackbar(false);
            }
            setTimeout(() => {
                setMessage('error');
                setShowSnackbar(true);
            }, 50);
        }
        snackbarTimeoutId.current = setTimeout(() => {
            setShowSnackbar(false);
        }, 2500);
    };


    const resetEmoji = (id: number) => {
        setDiaries(
            diaries.map(diary =>
                diary.id === id ? {...diary, emoji: null} : diary
            )
        );
    };

    return (
        <main
            className="App bg-blue-100 h-screen flex flex-col items-center space-y-5 overflow-auto scrollbar-hide py-10">
            <div>
                <h1 className="text-4xl text-blue-600">오늘의 일기</h1>
            </div>
            <div className="input-section border-solid border-2 border-sky-400 py-4 px-8 rounded-2xl">
                <Form dateInput={dateInput}
                      handleDateChange={handleDateChange}
                      textInput={textInput}
                      handleTextChange={handleTextChange}
                      handleFormSubmit={handleFormSubmit}
                />
            </div>
            <List
                diaries={diaries}
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
        </main>
    )
}
