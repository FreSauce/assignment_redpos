import { Button, Card, Divider, Layout, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchUsers, mailToEmail } from "./apiCalls";
import "./App.css";
import AddUserModal from "./components/AddUserModal";
import UserTable from "./components/UserTable";

function App() {
  const [openAddUserModal, setOpenAddUserModal] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [userData, setUserData] = useState([]);

  const refreshUsers = () => {
    fetchUsers().then((res) => {
      setUserData(res.map((user, ind) => ({ ...user, index: ind + 1 })));
    });
  };

  const sendSelectedData = () => {
    console.log(selectedRows);
    mailToEmail(selectedRows, "24shardul@gmail.com");
  };

  useEffect(() => {
    refreshUsers();
  }, [openAddUserModal]);

  const showAddUserModal = () => {
    setOpenAddUserModal(true);
  };

  return (
    <Layout>
      <Content
        style={{
          padding: "20px",
          height: "100vh",
        }}
      >
        <Card>
          <Space
            align="start"
            style={{
              width: "100%",
              flexDirection: "row-reverse",
            }}
          >
            <Button type="primary" onClick={showAddUserModal}>
              New Record
            </Button>
            <Button
              type="default"
              onClick={sendSelectedData}
              disabled={selectedRows.length < 1}
            >
              Send
            </Button>
            <Button type="dashed" onClick={refreshUsers}>
              Refresh
            </Button>
          </Space>
          <Divider />
          <UserTable
            userData={userData}
            setSelectedRows={setSelectedRows}
            refreshUsers={refreshUsers}
          />
        </Card>
      </Content>
      <AddUserModal open={openAddUserModal} setOpen={setOpenAddUserModal} />
    </Layout>
  );
}

export default App;
