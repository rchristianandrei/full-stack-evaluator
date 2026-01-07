import { useEffect, useState } from "react";
import AddUser from "./modals/AddUser";
import userRepo from "./api/userRepo";
import { TableHeader } from "./components/table/TableHeader";
import { TableEntry } from "./components/table/TableEntry";
import { Table } from "./components/table/Table";
import { Heading } from "./components/Heading";
import { Container } from "./components/Container";
import { DeleteButton } from "./components/buttons/DeleteButton";
import { PrimaryButton } from "./components/buttons/PrimaryButton";

function Users(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    userRepo
      .getAll(controller)
      .then((res) => setUsers(res.data))
      .catch((err) => {
        if (err.name !== "CanceledError") {
          console.error(err);
        }
      });

    return () => {
      controller.abort();
    };
  }, []);

  function OnDelete(userId) {
    const confirm = window.confirm(
      `Are you sure you want to delete user Id: ${userId}?`
    );

    if (!confirm) return;

    userRepo
      .deleteById(userId)
      .then(() => {
        userRepo
          .getAll()
          .then((res) => setUsers(res.data))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.log(err));
  }

  function OnPopupClose(success) {
    setIsOpen(false);

    if (!success) return;

    userRepo
      .getAll()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Container className={props.className}>
        <Heading>
          <h2 className="text-2xl">Users</h2>
          <PrimaryButton onClick={() => setIsOpen(true)}>
            Add
          </PrimaryButton>
        </Heading>
        <Table>
          <TableHeader className="grid-cols-[1fr_100px]">
            <div className="text-start">Email</div>
            <div>Actions</div>
          </TableHeader>
          {users.map((user) => (
            <TableEntry className="grid-cols-[1fr_100px]" key={user.id}>
              <div className="text-start">{user.email} </div>
              <DeleteButton onClick={() => OnDelete(user.id)}>
                Delete
              </DeleteButton>
            </TableEntry>
          ))}
        </Table>
      </Container>
      {isOpen && <AddUser onClose={OnPopupClose}></AddUser>}
    </>
  );
}

export default Users;
