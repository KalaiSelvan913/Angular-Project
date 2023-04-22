// const names: Array<string> = []; //string[]
// names[0].split('');

// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('This is done!');
//     }, 2000);
// });

// promise.then(data => {
//     data.split('');
// })

function merge<T extends object, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj.age);

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let desccriptionText = "Got no value.";
  if (element.length === 1) {
    desccriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    desccriptionText = "Got " + element.length + " element.";
  }
  return [element, desccriptionText];
}

// console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(["Sports", "Astronout"]));

function extractAndCounting<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "value: " + obj[key];
}

extractAndCounting({ name: "Max" }, "name");

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(10);
numberStorage.addItem(1500);
numberStorage.addItem(689);
numberStorage.removeItem(10);
console.log("Number Storage: " + numberStorage.getItems());

// const objStorage = new DataStorage<object>();
// const maxObj = {name : 'Max'};
// objStorage.addItem({ name: "Max" });
// objStorage.addItem({ name: "Manu" });
// //...
// objStorage.removeItem({ name: "Max" });
// console.log("objStorage: " + objStorage);

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal as CourseGoal;
}

const names: Readonly<string[]> = ['Max', 'Sports'];
// names.push('Manu');
// names.pop();
