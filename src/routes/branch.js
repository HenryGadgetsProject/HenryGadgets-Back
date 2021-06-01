const { Router } = require("express");
const { 
    getAllBranches,
    getBranchById,
    getBranchByLocation,
    editBranch,
    deleteBranch,
    newBranch,
} = require("../controllers/branch");

const router = Router();

router.get('/', getAllBranches);
router.get('/:id', getBranchById);
router.get('/:latitud/:longitud', getBranchByLocation);
router.post('/new', newBranch) 
router.put('/:id', editBranch);
router.delete('/:id', deleteBranch);

module.exports = router