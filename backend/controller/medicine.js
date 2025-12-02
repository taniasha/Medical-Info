import Medicine from "../models/medicine.js";

export const index = async (req, res) => {
  const allMedicine = await Medicine.find({});

  res.send({ success: true, allMedicine });
};

export const createMedicine = async (req, res) => {
  // let { id } = req.params;
  let newMedicine = new Medicine(req.body);
  const response = await newMedicine.save();
  console.log("New Medicine save into db" + response);

  res.send({success: true, message: "Medicine added successfully"});
};

export const viewMedicine = async (req, res) => {
  let { id } = req.params;

  const medicine = await Medicine.findById(id);

  res.send(medicine);
};

export const updateMedicine = async (req, res) => {
  let { id } = req.params;

  let updateMedicine = await Medicine.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );

  // res.redirect(`/admin`);
  res.send(updateMedicine);
};

export const deleteMedicine = async (req, res) => {
  let { id } = req.params;

  let delMedicine = await Medicine.findByIdAndDelete(id);

  res.send({success: true, message: 'Medicine deleted successfully!!!'});
};

export const filterMedicine = async (req, res) => {
  const search = req.params.search;

  try {
    const medicine = await Medicine.find({
      name: { $regex: "^" + search, $options: "i" }, // 'i' for case-insensitive
    });

    res.send(medicine);
  } catch (error) {
    res.status(200).send({ error: "Something went wrong" });
  }
};
