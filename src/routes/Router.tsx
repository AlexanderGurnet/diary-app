import { Routes, Route, Outlet } from 'react-router-dom';

import RequiredAuthRoute from './RequiredAuthRoute';
import DiaryPage from '../components/diary-page/DiaryPage';

import Header from '../components/header/Header';
import Greetings from '../components/greetings/Greetings';

import { authStore } from '../store/authStore';
import { diaryStore } from '../store/diaryStore';

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header authStore={authStore} />
            <Outlet />
          </>
        }
      >
        <Route path="/" element={<Greetings />} />
        <Route
          path="/diary"
          element={
            <RequiredAuthRoute authStore={authStore} redirectTo="/">
              <DiaryPage diaryStore={diaryStore} />
            </RequiredAuthRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default Router;
