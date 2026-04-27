const supabase = require('../config/supabase');

/**
 * @desc    Get user subscription status
 * @route   GET /api/subscriptions/status
 * @access  Private (Needs Auth)
 */
exports.getSubscriptionStatus = async (req, res) => {
  try {
    const userId = req.user.id;

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;

    res.status(200).json({
      success: true,
      subscription: data || { status: 'inactive' }
    });
  } catch (error) {
    console.error('Error fetching subscription:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch subscription status' });
  }
};

/**
 * @desc    Handle Paddle Webhook
 * @route   POST /api/subscriptions/webhook
 * @access  Public (Secure via Paddle signature)
 */
exports.handleWebhook = async (req, res) => {
  // Logic to handle Paddle webhooks (subscription_created, subscription_updated, etc.)
  // We will implement this once we have the Paddle keys and secret
  res.status(200).send('Webhook received');
};
