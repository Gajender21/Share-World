import { useUpdateUser } from "@/lib/react-query/queriesAndMutations";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { ProfileValidation } from "@/lib/validation";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "@/context/AuthContext";
import Loader from "../shared/Loader";
import { Form, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import ProfileUploader from "../shared/ProfileUploader";

function ProfileForm() {
  const { user, setUser } = useUserContext();
  console.log(user);
  const navigate = useNavigate();
  const { mutateAsync: updateUser, isPending } = useUpdateUser();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio ? user.bio : "",
    },
  });
  if (!user) {
    return <Loader />;
  }
  async function onSubmitHandler(values: z.infer<typeof ProfileValidation>) {
    const updatedProfile = await updateUser({
      userId: user.id,
      name: values.name,
      username: values.username,
      email: values.email,
      bio: values.bio,
      imageId: user.imageId,
      imageUrl: user.imageUrl,
      file: [],
    });
    if (!updatedProfile) {
      toast({
        title: `Update user failed. Please try again.`,
      });
    }
    setUser({
      ...user,
      name: updatedProfile?.name,
      username : updatedProfile?.username,
      email: updatedProfile?.email,
      bio: updatedProfile?.bio,
      imageUrl: updatedProfile?.imageUrl,
    });
    return navigate(`/profile/${user.id}`);
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="flex flex-col gap-7 w-full mt-4 max-w-5xl">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="flex">
                  <FormControl>
                    <ProfileUploader
                      fieldChange={field.onChange}
                      mediaUrl={user.imageUrl}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="shad-input"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Bio</FormLabel>
                  <FormControl>
                    <Textarea
                      className="shad-textarea custom-scrollbar"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="shad-form_message" />
                </FormItem>
              )}
            />

            <div className="flex gap-4 items-center justify-end">
              <Button
                type="button"
                className="shad-button_dark_4"
                onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button
                type="submit"
                className="shad-button_primary whitespace-nowrap"
                disabled={isPending}>
                {isPending && <Loader />}
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ProfileForm;
