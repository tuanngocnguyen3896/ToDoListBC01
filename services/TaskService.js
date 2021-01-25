import {BaseServices} from './BaseServices.js';
export class TaskService extends BaseServices{
    constructor(){
        // Gọi lại phương thức constructor của class cha
        // **** Bắt buộc********
        super();
    }
    // Định nghĩa phương thức getAllTask
    getAllTask = () => {
        return this.get('http://svcy.myclass.vn/api/ToDoList/GetAllTask');
    }
    // ĐỊnh nghĩa hàm xóa dữ liệu
    deleteTask = (taskName) => {
        return this.delete(`http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`);
    }
    // Định nghĩa hàm đưa dữ liệu về backend
    addTask = (task) => { // <= đúng định dạng backend quy định
        return this.post(`http://svcy.myclass.vn/api/ToDoList/AddTask`,task);
    }
    // Định nghĩa hàm
    doneTask = (taskName) => {
        return this.put(`http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`);
    }
    // Hàm reject
    rejectTask = (taskName) => {
       return this.put(`http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`);
    }
}
