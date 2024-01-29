import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  deleteStudent,
  editStudent,
  getAllStudent,
} from "../../feature/student/studentApiSlice";
import { Puff } from "react-loader-spinner";
import Swal from "sweetalert2";

const Student = () => {
  //Dispatch Initialize
  const dispatch = useDispatch();

  const { students, loader, message, error } = useSelector(
    (state) => state.student
  );

  //Get Input Value
  const [input, setInput] = useState({
    name: "",
    roll: "",
    email: "",
    photo: "",
    location: "",
  });

  // Set Edit Mood
  const [edit, setEdit] = useState(false);

  //Input Chenge Manage
  const handleInputChenge = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Handle Input Submit
  const handleInputSubmit = () => {
    if (edit) {
      // Student Edit Submit

      Swal.fire({
        title: `Hello ${input.name} Do you want to save the changes?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(editStudent(input));
          Swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });

      setInput({
        name: "",
        roll: "",
        email: "",
        photo: "",
        location: "",
      });
      setEdit(false);
    } else {
      //Student Create Submit
      dispatch(createStudent(input));
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Hello ${input.name}, Your Data Is Created`,
        showConfirmButton: false,
        timer: 1500,
      });
      setInput({
        name: "",
        roll: "",
        email: "",
        photo: "",
        location: "",
      });
    }
  };

  //Handle Input Edit
  const handleInputEdit = (item) => {
    setInput(item);
    setEdit(true);
  };

  //Hnadle Input Delet
  const handleStudentDelet = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Hello ${item.name} You won't be able to revert this!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudent(item));
        Swal.fire({
          title: "Deleted!",
          text: `Hello ${item.name} Your file has been deleted.`,
          icon: "success",
        });
      }
    });
  };

  //Get All Student
  useEffect(() => {
    dispatch(getAllStudent());
  }, []);

  return (
    <>
      <Container>
        <Row className="my-5">
          {loader ? (
            <div className="d-flex justify-content-center">
              <Puff
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            ""
          )}

          <Col md="10" className="m-auto">
            <div>
              <div className="studentForm d-flex gap-1 my-3">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={input.name}
                  onChange={handleInputChenge}
                />
                <input
                  type="text"
                  className="form-control"
                  name="roll"
                  placeholder="Roll"
                  value={input.roll}
                  onChange={handleInputChenge}
                />
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={input.email}
                  onChange={handleInputChenge}
                />
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Location"
                  value={input.location}
                  onChange={handleInputChenge}
                />
                <input
                  type="text"
                  className="form-control"
                  name="photo"
                  placeholder="Photo"
                  value={input.photo}
                  onChange={handleInputChenge}
                />
                <Button onClick={handleInputSubmit}>
                  {edit ? "Update" : "Add"}
                </Button>
              </div>

              <hr />
            </div>

            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>

                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Roll</th>
                  <th scope="col">Location</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0
                  ? students.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">1</th>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.roll}</td>
                          <td>{item.location}</td>
                          <td>
                            <div>
                              <Button
                                className="me-1"
                                onClick={() => handleInputEdit(item)}
                              >
                                E
                              </Button>
                              <Button onClick={() => handleStudentDelet(item)}>
                                D
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : "Student Not Found"}
              </tbody>
            </table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Student;
