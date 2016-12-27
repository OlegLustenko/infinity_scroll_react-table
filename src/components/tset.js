// @flow weak
let arr = [];
let data = [1, 2, 3];
let dataObj = { a: 3, b: 4 };

const asd: boolean = false;

function xyz(obj: Object, updatedData: Array < string > ): Object {
  return Object.keys(obj).reduce((a, b) => {
    if (obj[b] > 1) {
      updatedData.push('JS POWER');
    }
    a[b] = b;
    return a;
  }, {});
}

xyz(dataObj, arr);

let myArr = [
  [1]
];

let str = 'hello';

function multiply(qq: number[][]): number {
  return qq[0][0];
}

multiply(myArr);


let test = document.getElementById('qwe');

function wwrow(): Object[] { return row.map((x: Object) => x); }

ww();