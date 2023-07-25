import { describe, it, expect, vi } from "vitest";
import createWrapper from "../.mockFactory/mockFactory";
import UploadField from "../../src/Components/InputField/UploadField.vue";




describe("UploadField.vue", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = createWrapper(UploadField,{
        propsData:{
            value:{ size: 1000, type: "image/jpeg", name: "avatar.jpeg" },
            open:true,
        },
    });
  });


it("Should Emit Input With Empty String If Photo Is Delete",async ()=>{
  const DeletePhotoSpy = vi.spyOn(wrapper.vm,'DeletePhoto')
  expect(DeletePhotoSpy).toHaveBeenCalledTimes(0)
  expect(wrapper.emitted().input).toBeUndefined()
  await wrapper.find('button').trigger('click')
  expect(wrapper.emitted().input).toBeDefined()
  expect(DeletePhotoSpy).toHaveBeenCalledTimes(1)
  expect(wrapper.emitted().input.length).toBe(1)
  expect(wrapper.emitted().input[0]).toStrictEqual([''])
})

    
    
});
