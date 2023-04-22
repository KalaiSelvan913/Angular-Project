"use strict";
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj.age);
function countAndDescribe(element) {
    let desccriptionText = "Got no value.";
    if (element.length === 1) {
        desccriptionText = "Got 1 element.";
    }
    else if (element.length > 1) {
        desccriptionText = "Got " + element.length + " element.";
    }
    return [element, desccriptionText];
}
console.log(countAndDescribe(["Sports", "Astronout"]));
function extractAndCounting(obj, key) {
    return "value: " + obj[key];
}
extractAndCounting({ name: "Max" }, "name");
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(10);
numberStorage.addItem(1500);
numberStorage.addItem(689);
numberStorage.removeItem(10);
console.log("Number Storage: " + numberStorage.getItems());
function createCourseGoal(title, description, date) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
const names = ['Max', 'Sports'];
//# sourceMappingURL=app.js.map