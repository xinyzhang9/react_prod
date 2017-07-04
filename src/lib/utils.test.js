import {partial} from './utils'

const add = (a,b) => a + b;
const addThree = (a,b,c) => a + b + c;

test('partial applies the first argument ahead of time', ()=>{
  const inc = partial(add,1);
  const res = inc(2);
  expect(res).toBe(3);
})

test('partial applies the multiple argument ahead of time', ()=>{
  const inc = partial(addThree,1,3);
  const res = inc(2);
  expect(res).toBe(6);
})
