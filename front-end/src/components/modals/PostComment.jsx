import { Label } from '../ui/Label'
import { Button } from '../ui/Button'

export const PostComment = ({ handleSubmit,handleChange,setOpenPostComment, loading }) => {
  return (
    <div className="z-20 fixed inset-0 flex items-center text-gray-700 justify-center bg-black backdrop-blur-md bg-opacity-50">
      <div className="bg-white w-full max-w-md px-8 py-6 rounded-lg shadow-xl">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800">Post a comment on this product</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill this input to post your comment
          </p>
        </div>
        <form className="mt-6" onSubmit={handleSubmit}>
            <div>
                <Label text={"Comment max:300chars"} /><br></br>
                <textarea name="bio" placeholder='ex: I like this product!' maxLength={"ex: I like it!"} required={false} onChange={handleChange} className="w-[100%] px-3 py-1 outline-none border border-gray-300 resize-none"></textarea>
            </div>
          
          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              text="Cancel"
              onClick={() => setOpenPostComment(false)}
              bg="bg-gray-200"
              color="gray-900"
            />
            <Button
              type="submit"
              text="Post"
              loading={loading}
              bg="bg-blue-600"
              color="white"
            />
          </div>
        </form>
      </div>
    </div>
  )
}  