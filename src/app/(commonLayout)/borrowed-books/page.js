import BorrowedBooks from "@/components/BorrowedBooks/BorrowedBooks";
import PrivateRoute from "@/components/PrivateRoute/PrivateRoute";

const BorrowedBooksPage = () => {
  return (
    <PrivateRoute allowedRoles={["admin","user"]}>
      <BorrowedBooks />
    </PrivateRoute>
  );
};

export default BorrowedBooksPage;
