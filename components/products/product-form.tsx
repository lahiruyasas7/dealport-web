"use client";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { productSchema } from "@/features/products/schemas/product.schema";
import { useCreateProduct } from "@/features/products/hooks/use-create-product";
import { useCategories } from "@/features/categories/hooks/use-categories";
import { useTags } from "@/features/tags/hooks/use-tags";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductImageUploader } from "./product-image-uploader";
import { MultiSelectPopover } from "./multi-select-popover";
import { DatePickerField } from "./date-picker-field";
import { ColorSwatchPicker } from "./color-select-picker";
import { Save } from "lucide-react";

export function ProductForm() {
  const router = useRouter();
  const createProduct = useCreateProduct();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: tags, isLoading: tagsLoading } = useTags();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      taxIncluded: true,
      isUnlimited: false,
      isFeatured: false,
      stockStatus: "IN_STOCK",
      status: "DRAFT",
      colors: [],
      images: [],
      categoryIds: [],
      tagIds: [],
    },
  });

  const isUnlimited = watch("isUnlimited");
  const price = watch("price");
  const discountedPrice = watch("discountedPrice");
  const salePrice =
    price && discountedPrice != null
      ? (Number(price) - Number(discountedPrice)).toFixed(2)
      : null;

  const onSubmit = (status: "DRAFT" | "PUBLISHED") =>
    handleSubmit((data) => {
      createProduct.mutate(
        { ...data, status },
        { onSuccess: () => router.push("/products") },
      );
    });

  return (
    <form className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">
          Add New Product
        </h1>
        <div className="flex gap-2">
          <Button
            type="button"
            className="h-12 w-[140px] bg-sidebar-active text-sidebar-active-foreground hover:bg-sidebar-active/90"
            onClick={onSubmit("PUBLISHED")}
            disabled={createProduct.isPending}
          >
            Publish Product
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-12 w-[140px] rounded-sm "
            onClick={onSubmit("DRAFT")}
            disabled={createProduct.isPending}
          >
            <Save className="h-4 w-4" />
            Save to draft
          </Button>
        </div>
      </div>

      {createProduct.isError && (
        <p className="text-sm text-error">
          {createProduct.error instanceof Error
            ? createProduct.error.message
            : "Failed to save product."}
        </p>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <section className="rounded-lg bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg font-medium text-foreground">
              Basic Details
            </h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name">Product Name</Label>
                <Input id="name" {...register("name")} />
                {errors.name && (
                  <p className="text-sm text-error">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  {...register("description")}
                />
              </div>
            </div>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg font-medium text-foreground">Pricing</h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="price">Product Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register("price")}
                />
                {errors.price && (
                  <p className="text-sm text-error">{errors.price.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="discountedPrice">
                    Discounted Price (Optional)
                  </Label>
                  <Input
                    id="discountedPrice"
                    type="number"
                    step="0.01"
                    {...register("discountedPrice")}
                  />
                  {salePrice && (
                    <p className="text-xs text-muted-foreground">
                      Sale= ${salePrice}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Tax Included</Label>
                  <Controller
                    control={control}
                    name="taxIncluded"
                    render={({ field }) => (
                      <RadioGroup
                        value={field.value ? "yes" : "no"}
                        onValueChange={(v) => field.onChange(v === "yes")}
                        className="flex gap-4 pt-1"
                      >
                        <label className="flex items-center gap-1.5 text-sm">
                          <RadioGroupItem value="yes" /> Yes
                        </label>
                        <label className="flex items-center gap-1.5 text-sm">
                          <RadioGroupItem value="no" /> No
                        </label>
                      </RadioGroup>
                    )}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Expiration Start</Label>
                  <Controller
                    control={control}
                    name="expirationStart"
                    render={({ field }) => (
                      <DatePickerField
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Start"
                      />
                    )}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Expiration End</Label>
                  <Controller
                    control={control}
                    name="expirationEnd"
                    render={({ field }) => (
                      <DatePickerField
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="End"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg font-medium text-foreground">Inventory</h2>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="stockQuantity">Stock Quantity</Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    disabled={isUnlimited}
                    placeholder={isUnlimited ? "Unlimited" : undefined}
                    {...register("stockQuantity")}
                  />
                  {errors.stockQuantity && (
                    <p className="text-sm text-error">
                      {errors.stockQuantity.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label>Stock Status</Label>
                  <Controller
                    control={control}
                    name="stockStatus"
                    render={({ field }) => {
                      const selectedLabel =
                        field.value === "IN_STOCK"
                          ? "In Stock"
                          : field.value === "OUT_OF_STOCK"
                            ? "Stock Out"
                            : undefined;

                      return (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status">
                              {selectedLabel}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IN_STOCK">In Stock</SelectItem>
                            <SelectItem value="OUT_OF_STOCK">
                              Stock Out
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                </div>
              </div>

              <Controller
                control={control}
                name="isUnlimited"
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm">
                    <Switch
                      checked={field.value}
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        if (checked) setValue("stockQuantity", undefined);
                      }}
                    />
                    Unlimited
                  </label>
                )}
              />

              <Controller
                control={control}
                name="isFeatured"
                render={({ field }) => (
                  <label className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    Highlight this product in a featured section.
                  </label>
                )}
              />
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-lg bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg font-medium text-foreground">
              Upload Product Image
            </h2>
            <div className="mt-4">
              <Controller
                control={control}
                name="images"
                render={({ field }) => (
                  <ProductImageUploader
                    images={field.value ?? []}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </section>

          <section className="rounded-lg bg-white p-5 shadow-[0px_1px_3px_rgba(0,0,0,0.2)]">
            <h2 className="text-lg font-medium text-foreground">Categories</h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <Label>Product Categories</Label>
                <Controller
                  control={control}
                  name="categoryIds"
                  render={({ field }) => (
                    <MultiSelectPopover
                      label="Categories"
                      options={categories ?? []}
                      selected={field.value ?? []}
                      onChange={field.onChange}
                      isLoading={categoriesLoading}
                    />
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Product Tag</Label>
                <Controller
                  control={control}
                  name="tagIds"
                  render={({ field }) => (
                    <MultiSelectPopover
                      label="Tags"
                      options={tags ?? []}
                      selected={field.value ?? []}
                      onChange={field.onChange}
                      isLoading={tagsLoading}
                    />
                  )}
                />
              </div>
              <div className="space-y-1.5">
                <Label>Select your color</Label>
                <Controller
                  control={control}
                  name="colors"
                  render={({ field }) => (
                    <ColorSwatchPicker
                      value={field.value ?? []}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
