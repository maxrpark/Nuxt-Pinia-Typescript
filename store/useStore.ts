import { defineStore } from 'pinia';
import { Item, Project } from '../ts/interfaces';

let url = 'https://assitant-app.netlify.app/api/projects-api';
const saveLocalStorage = (todoList: Item[]) => {
  localStorage.setItem('PiniatodoListTs', JSON.stringify(todoList));
};
let timeOut = 0;
export const useStore = defineStore({
  id: 'app-store',
  state: () => {
    return {
      projects: [] as Project[],
      todoList: [] as Item[],
      showAlert: false,
      isEditing: false,
      ItemID: '',
      ItemValue: '',
      alertMessege: {
        messege: '',
        type: '',
      },
    };
  },
  getters: {
    title: (state) => {
      return state.projects.length > 0 ? 'Assistant' : 'Loading...';
    },
  },

  actions: {
    async getProjects() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        this.projects = data;
      } catch (error) {
        console.log(error);
      }
    },
    getLocalStorage() {
      let todoList = localStorage.getItem('PiniatodoListTs');
      if (todoList) {
        return (this.todoList = JSON.parse(
          localStorage.getItem('PiniatodoListTs') as string
        ));
      } else {
        return (this.todoList = []);
      }
    },
    handleSubmit() {
      if (this.ItemValue && this.ItemValue.trim() !== '') {
        if (!this.isEditing) {
          const todoItem = {
            id: new Date().getTime().toString(),
            value: this.ItemValue,
            isComplete: false,
          };
          this.ItemValue = '';
          this.todoList.push(todoItem);
          const alertMessege = {
            messege: 'New task added',
            type: 'success',
          };
          this.alertMessege = alertMessege;
          this.showAlert = true;
        } else {
          const tempList = this.todoList.map((item: Item) => {
            if (item.id === this.ItemID) {
              return { ...item, value: this.ItemValue };
            }
            return item;
          });
          const alertMessege = {
            messege: 'Task updated',
            type: 'success',
          };
          this.alertMessege = alertMessege;
          this.showAlert = true;
          this.todoList = tempList;
          this.isEditing = false;
          this.ItemID = '';
          this.ItemValue = '';
        }
        saveLocalStorage(this.todoList);
      }
    },
    editItem(id: string) {
      const specificItem = this.todoList.find((item: Item) => item.id === id);
      const alertMessege = {
        messege: 'Editing...',
        type: 'warning',
      };
      this.alertMessege = alertMessege;
      this.showAlert = true;
      this.isEditing = true;
      this.ItemID = id;
      this.ItemValue = specificItem!.value;
    },
    toogleCompled(id: string) {
      let tempList = this.todoList.map((item) => {
        if (item.id === id) {
          const alertMessege = {
            messege: 'Task Completed',
            type: 'success',
          };
          if (!item.isComplete) {
            this.alertMessege = alertMessege;
            this.showAlert = true;
          }
          return { ...item, isComplete: !item.isComplete };
        }
        return item;
      });
      this.todoList = tempList;
      this.ItemValue = '';
      this.isEditing = false;
      saveLocalStorage(this.todoList);
    },
    deleteItem(id: string) {
      const alertMessege = {
        messege: 'Task Deleted',
        type: 'danger',
      };
      this.alertMessege = alertMessege;
      this.showAlert = true;
      this.todoList = this.todoList.filter((item) => item.id !== id);
      this.ItemValue = '';
      this.isEditing = false;
      saveLocalStorage(this.todoList);
    },
    removeAll() {
      const alertMessege = {
        messege: 'No more staks',
        type: 'danger',
      };
      this.alertMessege = alertMessege;
      this.showAlert = true;
      this.todoList = [];
      this.isEditing = false;
      this.ItemValue = '';
      saveLocalStorage(this.todoList);
    },
    displayAlert() {
      clearTimeout(timeOut);
      if (this.alertMessege.messege !== 'Editing...') {
        timeOut = window.setTimeout(() => {
          this.showAlert = false;
        }, 1500);
      }
    },
  },
});
