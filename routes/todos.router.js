const Todo = require("./models/todo");

router.post("/todos", async (req, res) => {
  const { value } = req.body;
  const maxOrderByUserId = await Todo.findOne().sort("-order").exec();
  /* exec() 를 사용하면 유사 Promise 가 아닌 온전한 Promise 를 반환값으로 얻을 수 있다.
     에러가 났을 때 stack trace 에 오류가 발생한 코드의 위치가 포함되기 때문에 권장한다.
     참조 : https://tesseractjh.tistory.com/166 */
  const order = maxOrderByUserId ? maxOrderByUserId.order + 1 : 1;
  const todo = new Todo({ value, order });
  await todo.save();
  res.send({ todo });
});
