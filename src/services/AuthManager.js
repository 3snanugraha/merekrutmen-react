import PocketBase from 'pocketbase';

const pb = new PocketBase("https://rutan-app.pockethost.io");

const AuthManager = {
  isAuthenticated: false,
  token: null,
  userId: null,
  pb: pb, // Menambahkan pb ke dalam objek AuthManager

  async authenticate() {
    try {
      const authData = await this.pb.admins.authWithPassword("difariivman@gmail.com", "KataSandi987");
      this.isAuthenticated = this.pb.authStore.isValid;
      this.token = this.pb.authStore.token;
      this.userId = this.pb.authStore.model.id;
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  },

  clearAuth() {
    this.isAuthenticated = false;
    this.token = null;
    this.userId = null;
    this.pb.authStore.clear();
  }
};

export default AuthManager;
