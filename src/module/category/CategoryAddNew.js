import { Button } from "components/button";
import { Checkbox, Radio } from "components/checkbox";
import { Field } from "components/field";
import { Input } from "components/input";
import { Label } from "components/label";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useForm } from "react-hook-form";
const CategoryAddNew = () => {
  const { control, handleSubmit } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const handleAddNewCategory = (values) => {
    console.log("values ~", values);
  };
  return (
    <div>
      <DashboardHeading
        title="New Category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)}>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              placeholder="Enter your category name"
              name="name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout mb-10">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio name="status" control={control} checked={true}>
                Approved
              </Radio>
              <Radio name="status" control={control}>
                Unapproved
              </Radio>
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
