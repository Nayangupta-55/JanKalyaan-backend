// import express from 'express';
// import schemeModel from '../models/Schemes.js'; // Adjust the import path as necessary
// const schemeRouter = express.Router();

// // Get all schemes
// schemeRouter.get('/', async (req, res) => {
//     try {
//         const schemes = await schemeModel.find();
//         res.status(200).json(schemes);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

// // Create a new scheme
// // schemeRouter.post('/', async (req, res) => {
// //     const { Scheme: schemeName, Icon } = req.body;

// //     const newScheme = new Scheme({
// //         Scheme: schemeName,
// //         Icon,
// //     });

// //     try {
// //         const savedScheme = await newScheme.save();
// //         res.status(201).json(savedScheme);
// //     } catch (error) {
// //         res.status(400).json({ message: error.message });
// //     }
// // });

// // // Get a specific scheme by ID
// // schemeRouter.get('/:id', async (req, res) => {
// //     try {
// //         const scheme = await Scheme.findById(req.params.id);
// //         if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
// //         res.status(200).json(scheme);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });

// // // Update a scheme by ID
// // schemeRouter.put('/:id', async (req, res) => {
// //     try {
// //         const updatedScheme = await Scheme.findByIdAndUpdate(
// //             req.params.id,
// //             req.body,
// //             { new: true }
// //         );
// //         if (!updatedScheme) return res.status(404).json({ message: 'Scheme not found' });
// //         res.status(200).json(updatedScheme);
// //     } catch (error) {
// //         res.status(400).json({ message: error.message });
// //     }
// // });

// // // Delete a scheme by ID
// // schemeRouter.delete('/:id', async (req, res) => {
// //     try {
// //         const deletedScheme = await Scheme.findByIdAndDelete(req.params.id);
// //         if (!deletedScheme) return res.status(404).json({ message: 'Scheme not found' });
// //         res.status(200).json({ message: 'Scheme deleted successfully' });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // });

// export default schemeRouter;



import express from 'express';
import schemeModel from '../models/Schemes.js'; // Adjust the path if needed
import SchemaByIdModel from '../models/SchemaById.js';
const schemeRouter = express.Router();

// GET all schemes
schemeRouter.get('/getData', async (req, res) => {
    try {
        const schemes = await schemeModel.find();
        res.status(200).json(schemes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create a new scheme
schemeRouter.post('/create', async (req, res) => {
  
    const { scheme, icon } = req.body;
console.log(req.body);

    const newScheme = new schemeModel({
        Scheme : scheme,
        Icon : icon, // Assuming you want to save the icon as well
    
     
    });

    try {   
        const savedScheme = await newScheme.save();
        res.status(201).json(savedScheme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET a specific scheme by ID
schemeRouter.get('/:id', async (req, res) => {
    try {
        const scheme = await schemeModel.findById(req.params.id);
        if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
        res.status(200).json(scheme);
    } catch (error) {
        res.status(500).json({ message: error.message });                                    
    }
});

// PUT update a scheme by ID
schemeRouter.put('/:id', async (req, res) => {
    try {
        const updatedScheme = await schemeModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedScheme) return res.status(404).json({ message: 'Scheme not found' });
        res.status(200).json(updatedScheme);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a scheme by ID
schemeRouter.delete('/:id', async (req, res) => {
    try {
        const deletedScheme = await schemeModel.findByIdAndDelete(req.params.id);
        if (!deletedScheme) return res.status(404).json({ message: 'Scheme not found' });
        res.status(200).json({ message: 'Scheme deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




schemeRouter.post('/mergByIDurl',(req , res   ) => {
    console.log(req.body);
      const y=  new SchemaByIdModel({
        ID: req.body.id,
        Description: req.body.name,
        Description2: req.body.description,
        Description3: req.body.desc2,
        Benefits: req.body.benefits,
        Eligibility: req.body.eligibility,
        ApplicationProcess: req.body.applicationProcess,
        DocumentsRequired: req.body.documentsRequired,
        Link: req.body.link, 
    }).save()
console.log("Data saved successfully");
    res.status(200).json({ message: 'Data saved successfully' });   
})
// Export the router



schemeRouter.post('/idReqGetScheme', async (req, res) => {
  try {
    const { id } = req.body;
    console.log('Received ID:', id);

    const scheme = await SchemaByIdModel.find({'ID':id}); // Replace with your actual DB model
console.log('Scheme found:', scheme);

    if (!scheme) {
      return res.status(404).json({ message: 'Scheme not found' });
    }

    res.json(scheme); // Send scheme back to frontend
  } catch (error) {
    console.error('Error in idReqGetScheme:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
export default schemeRouter;
