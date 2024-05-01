exports.handleRequest =  async (res, asyncCallback) => {
    try {
        const response = await asyncCallback();
        res.status(response.status).json(response);
      } catch (error) {
        res.status(500).json({ success: false, error: error.message });
      }
}