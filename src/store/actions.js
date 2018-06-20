export const getTasks = async ({commit}) => {
  const data = await window.requester.getAssignedTasks();
  commit('tasks', data)
};
