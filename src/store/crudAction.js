import { firestore } from "../config/firebase";

export const fetchUsers = () => async (dispatch) => {
    try {
        const tasksCollection = await firestore
            .collection("task")
            .orderBy("customId")
            .get();
        let temp = tasksCollection.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        dispatch({ type: "GETAllTodos", payload: temp });
    } catch (error) {
        console.error("Error fetching users:", error.message);
    }
};

export const addUser = (todo) => async (dispatch) => {
    try {
        const latestDocument = await firestore
            .collection("task")
            .orderBy("customId", "desc")
            .limit(1)
            .get();

        todo.customId =
            latestDocument.docs.length > 0
                ? latestDocument.docs[0].data().customId + 1
                : 0;

        let temp = await firestore.collection("task").add(todo);
        dispatch({ type: "AddTodo", payload: temp });
    } catch (error) {
        console.error("Error adding user:", error.message);
    }
};

export const updateUser =
    ({ id, todo }) =>
    async (dispatch) => {
        try {
            await firestore.collection("task").doc(id).update(todo);
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    
export const deleteUser = (id) => async (dispatch) => {
    try {
        await firestore.collection("task").doc(id).delete();

        const remainingDocuments = await firestore
            .collection("task")
            .orderBy("customId")
            .get();

        const updates = remainingDocuments.docs.map((doc, index) => {
            return firestore
                .collection("task")
                .doc(doc.id)
                .update({ customId: index });
        });

        await Promise.all(updates);

        const updatedDocuments = await firestore
            .collection("task")
            .orderBy("customId")
            .get();
        let temp = updatedDocuments.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        dispatch({ type: "GETAllUsers", payload: temp });
    } catch (error) {
        console.error("Error deleting user:", error.message);
    }
};
