import BorrowedBooks from "@/components/BorrowedBooks/BorrowedBooks";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

const BorrowedBooksPage = () => {
  return (
    <PrivateRoute>
      <BorrowedBooks />
    </PrivateRoute>
  );
};

export default BorrowedBooksPage;
