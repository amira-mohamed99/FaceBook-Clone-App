import { BsSend } from "react-icons/bs";
import { useEffect, useState } from "react";
import {
  createComment,
  getPostComments,
  updateComments,
} from "../../Services/commentsServises.js";
import { BsEmojiSmile } from "react-icons/bs";
import { Button } from "@heroui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function CommentInput({
  setPostComments,
  id,
  commentId,
  editingComment,
  clearEditing,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [commentMsg, setCommentMsg] = useState("");
  const queryClient = useQueryClient();
  function sendComment(e) {
    setCommentMsg(e.target.value);
  }

  async function addComment(comment) {
    setIsLoading(true);
    try {
      const { data } = await createComment(comment);
      setPostComments([...data.comments].reverse());
      setCommentMsg("");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    if (editingComment) {
      setCommentMsg(editingComment || "");
    }
  }, [editingComment]);

  async function editComments(commentId, commentMsg) {
    setIsLoading(true);

    try {
      const { data } = await updateComments(commentId, {
        content: commentMsg,
      });
      console.log(data);
      setPostComments((prevComments) =>
        prevComments.map((c) =>
          c._id === commentId ? { ...c, content: commentMsg } : c
        )
      );
      queryClient.invalidateQueries(["getPostComments", id]);
      setCommentMsg("");
      clearEditing()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  const { data , refetch} = useQuery({
    queryKey: ["getPostComments", id],
    queryFn: () => getPostComments(id),
    onSuccess: (data) => setPostComments([...data.comments]),
  });
  return (
    <>
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <input
          type="text"
          value={commentMsg}
          placeholder="Write your comment"
          onChange={(e) => sendComment(e)}
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button
          onPress={() => {
            if (commentId) {
              editComments(commentId, commentMsg);
            } else {
              addComment({
                content: commentMsg,
                post: id,
              });
            }
          }}
          isLoading={isLoading}
          color="secondary"
          radius="full"
          size="sm"
          variant="shadow"
          disabled={!commentMsg}
          className="disabled:bg-violet-300 disabled:cursor-not-allowed disabled:shadow-none"
        >
          <BsSend className="text-lg" />
        </Button>
        <button className="text-gray-400 hover:text-gray-600">
          <BsEmojiSmile className="w-5 h-5" />
        </button>
      </div>
    </>
  );
}
