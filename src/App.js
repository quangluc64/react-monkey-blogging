import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { Suspense, lazy } from "react";

const SignInPage = lazy(() => import("pages/SignInPage"));
const SignUpPage = lazy(() => import("pages/SignUpPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));
const PostDetailsPage = lazy(() => import("pages/PostDetailsPage"));
const CategoryPage = lazy(() => import("pages/CategoryPage"));
const AuthorPage = lazy(() => import("pages/AuthorPage"));
const DashboardLayout = lazy(() => import("module/dashboard/DashboardLayout"));
const DashboardPage = lazy(() => import("pages/DashboardPage"));
const PostManage = lazy(() => import("module/post/PostManage"));
const PostAddNew = lazy(() => import("module/post/PostAddNew"));
const PostUpdate = lazy(() => import("module/post/PostUpdate"));
const CategoryAddNew = lazy(() => import("module/category/CategoryAddNew"));
const CategoryManage = lazy(() => import("module/category/CategoryManage"));
const CategoryUpdate = lazy(() => import("module/category/CategoryUpdate"));
const UserManage = lazy(() => import("module/user/UserManage"));
const UserAddNew = lazy(() => import("module/user/UserAddNew"));
const UserUpdate = lazy(() => import("module/user/UserUpdate"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<NotFoundPage />} />
            <Route path="/contact" element={<NotFoundPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/:slug" element={<PostDetailsPage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/author/:slug" element={<AuthorPage />} />
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/manage/post" element={<PostManage />} />
              <Route path="/manage/add-post" element={<PostAddNew />} />
              <Route path="/manage/update-post" element={<PostUpdate />} />
              <Route path="/manage/add-category" element={<CategoryAddNew />} />
              <Route path="/manage/category" element={<CategoryManage />} />
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate />}
              />
              <Route path="/manage/user" element={<UserManage />} />
              <Route path="/manage/add-user" element={<UserAddNew />} />
              <Route path="/manage/update-user" element={<UserUpdate />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;
