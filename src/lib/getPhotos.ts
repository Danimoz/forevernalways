import WeddingPhotos from './models';

export async function getPhotos(page = 1, pageSize = 10){
  try{
    // Calculate the number of documents to skip
    const skip = (page - 1) * pageSize;

    // Fetch and sort the documents, and apply pagination
    const images = await WeddingPhotos.find()
      .sort({ createdAt: -1 }) // Assuming 'createdAt' is the field to sort by latest
      .skip(skip)
      .limit(pageSize);

    // Get the total count of documents
    const total = await WeddingPhotos.countDocuments();

    // Return the paginated results
    return {
      images,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    };
  } catch (error) {
    console.error('Error fetching photos:', error);
    throw new Error('Could not fetch photos');
  }
}