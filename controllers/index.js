import { Task } from "../models/task.js";
import { TaskService } from "../services/TaskService.js";
// 1.1: khai báo đối tượng service
const taskSV = new TaskService();

//1.2: Lấy dữ liệu từ backend
const getAllTask = async () => {
  // dùng service để call aipi từ backend lấy dữ liệu về
  try {
    // Bước 2:
    const result = await taskSV.getAllTask();
    // console.log("result: ", result.data);
    // Bước 3 : từ dữ liệu lấy về tách ra 2 mảng => render ra màn hình
    let taskTodo = result.data.filter((task) => task.status === false);
    // console.log("task chưa làm :", taskTodo);
    // Gọi hàm hiển thị task todo
    renderTaskTodo(taskTodo);
    let taskCompleted = result.data.filter((task) => task.status === true);
    // console.log("task đã làm : ", taskCompleted);
    // Gọi hàm hiển thị task complete
    renderTaskCompleted(taskCompleted);

    // window.sortASC = () => {
    //     result.data.sort((a,b) => {
    //         if(a.taskName <  b.taskName){
    //             return -1; // (số âm) đổi vị trí
    //         }
    //         return 1; // (số dương) giữ nguyên vị trí
    //     });
    //     getAllTask();
    // };

    // window.sortDES = () => {
    //     result.data.sort((a,b) => {
    //         if(a.taskName <  b.taskName){
    //             return 1; // (số âm) đổi vị trí
    //         }
    //         return -1; // (số dương) giữ nguyên vị trí
    //     });
    //     getAllTask();
    // };
    
  } catch (err) {}
  // Cách cũ
  // const promise = taskSV.getAllTask();
  // promise.then(res => {
  //     console.log('res:' , res);
  // })
};
getAllTask(); // =>>> Bước 1: call API từ back end
// 2.1
// render task todo
const renderTaskTodo = (taskTodo) => {
  const contentTodo = taskTodo.reduce((content, task, index) => {
    return (content += `
        <li>
        ${task.taskName}
        <div><a onclick="delTask('${task.taskName}')" id='btnXoa' class="buttons " style="cursor: pointer;margin-right: 10px;
        "><i class="fa fa-trash"></i></a>
        <a onclick="donTask('${task.taskName}')" class="buttons" style="cursor: pointer;"><i class="fa fa-check"></i></a></div>
        </li>
        `);
  }, "");
  // DOM tới giao diện hiển thị ra ngoài
  document.getElementById("todo").innerHTML = contentTodo;
};
// 2.2
// render task complete
const renderTaskCompleted = (taskCompleted) => {
  let contentCompleted = taskCompleted.reduce((content, task, index) => {
    return (content += `
        <li>
        ${task.taskName}
        <div><a onclick="delTask('${task.taskName}')"  class="buttons " style="cursor: pointer;margin-right: 10px"><i class="fa fa-trash"></i></a>
        <a onclick="reTask('${task.taskName}')" class="buttons" style="cursor: pointer;"><i class="fa fa-check"></i></a></div>
        </li>
        `);
  }, "");
  document.getElementById("completed").innerHTML = contentCompleted;
};
// ==========Nghiệp vụ thêm task ==================
// B1: định nghĩa sự kiện click cho btn thêm item
document.getElementById("addItem").onclick = async (event) => {
  // event.preventDefault() chặn sự kiện hiện tại của thẻ submit hay thẻ href thẻ a
  // event.target đại diện cho thẻ button đang được onclick
  // Lấy thông tin người dùng nhập từ giao diện
  let taskName = document.getElementById("newTask").value;
  // Tạo ra oject Backend yêu cầu
  const taskModel = new Task();
  taskModel.taskName = taskName;
  // Gọi api đưa dữ liệu về sever
  try {
    let result = await taskSV.addTask(taskModel);
    // Sau khi thêm thì gọi api getAllTask từ hàm viết sẵn
    getAllTask();
  } catch (err) {
    console.log(err);
  }
};
// ==========Nghiệp vụ xóa dữ liệu ==========
window.delTask = async (taskName) => {
    
    let cfm = confirm("Are u sure ???");
    if(cfm){
            // Gọi api mỗi khi người dùng bấm nút xóa
        try {
            let result = await taskSV.deleteTask(taskName);
            console.log(result.data);
            // Gọi lại hàm get task sau khi xóa
            getAllTask();
          } catch (err) {
            console.log(err);
          }
    }
};
// ========== Nghiệp vụ done Task ==========
window.donTask = async (taskName) => {
    try {
        let result = await taskSV.doneTask(taskName);
        alert("Task Done");
        getAllTask();
    }catch(err){
        console.log(err);
    }
}
// =========Nghiệp vụ reTask========
window.reTask = async (taskName) => {
    try {
        let result = await taskSV.rejectTask(taskName);
        getAllTask();
    }catch(err){
        console.log(err);
    }
}
