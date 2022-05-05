<template>
<div>
<div v-if="myUsers.length==0" class="container mt-5">
  <b-alert show>You do not have chats. </b-alert>
</div>
  <div class="chat-container" v-if="myUsers.length>0">
    <div class="row justify-content-center h-100">
      <div class="col-md-4 chat pr-0 pl-0 pt-0 pb-0">
        <div class="card mb-sm-0 mb-md-0 contacts_card pl-3 message-card-1">
          <!-- <div class="card-header">
            <div class="input-group">
              <input
                type="text"
                placeholder="Search..."
                name=""
                class="form-control search"
              />
              <div class="input-group-prepend">
                <span class="input-group-text search_btn"
                  ><i class="fas fa-search"></i
                ></span>
              </div>
            </div>
          </div> -->
          <div class="card-body contacts_body">
            <ui class="contacts">
              <li
                v-for="user in myUsers"
                :key="user.user_uuid"
                @click="setMessages(user)"
                :class="
                  activeUser && activeUser.user_uuid == user.user_uuid
                    ? 'pl-5 active'
                    : 'pl-5 '
                "
              >
                <div class="d-flex bd-highlight">
                  <div class="img_cont">
                    <img
                      :src="
                        user.user_picture
                          ? 'https://api.text.mednoor.com/profile/' +
                            user.user_picture
                          : 'https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg'
                      "
                      class="rounded-circle user_img"
                    />
                    <!-- <span class="online_icon offline"></span -->
                  </div>
                  <div class="user_info">
                    <span>
                      {{ user.user_last_name }},{{ user.user_first_name }}
                    </span>
                    <!-- <p>Rashid left 50 mins ago</p> -->
                  </div>
                </div>
              </li>
            </ui>
          </div>
          <!-- <div class="card-footer"></div> -->
        </div>
      </div>
      <div class="col-md-8 chat p-0">
        <div class="card message-card-2">
          <div v-if="activeUser" class="card-header msg_head">
            <div class="d-flex bd-highlight">
              <div class="img_cont">
                <img
                  :src="
                    activeUser.user_picture
                      ? 'https://api.text.mednoor.com/profile/' +
                        activeUser.user_picture
                      : 'https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg'
                  "
                  class="rounded-circle user_img"
                />
                <span class="online_icon"></span>
              </div>
              <div class="user_info">
                <span>Chat with {{ activeUser.user_first_name }}</span>
                <p>{{ messages.length }} Messages</p>
              </div>
              <div class="video_cam">
                <span id="action_menu_btn"> <i class="mdi mdi-phone"></i></span>
                <!-- <span><i class="fas fa-phone"></i></span> -->
              </div>
            </div>
            <!-- <span id="action_menu_btn"><i class="fas fa-ellipsis-v"></i></span> -->
            <!-- <div class="action_menu">
              <ul>
                <li><i class="fas fa-user-circle"></i> View profile</li>
                <li><i class="fas fa-users"></i> Add to close friends</li>
                <li><i class="fas fa-plus"></i> Add to group</li>
                <li><i class="fas fa-ban"></i> Block</li>
              </ul>
            </div> -->
          </div>
          <div class="card-body msg_card_body" id="messageBox">
            <div v-for="message in messages" :key="message.mess_uuid">
              <div
                v-if="$store.auth.user.uuid == message.mess_sender"
                class="d-flex justify-content-end mb-4"
              >
                <div class="msg_cotainer_send">
                  {{ message.mess_message }}
                  <!-- <span class="msg_time_send">8:55 AM, Today</span> -->
                </div>
                <div class="img_cont_msg">
                  <img
                    :src="
                      $store.auth.user.picture
                        ? 'https://api.text.mednoor.com/profile/' +
                          $store.auth.user.picture
                        : 'https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg'
                    "
                    class="rounded-circle user_img_msg"
                  />
                </div>
              </div>
              <div v-else class="d-flex justify-content-start mb-4">
                <div class="img_cont_msg">
                  <img
                    :src="
                      activeUser.user_picture
                        ? 'https://api.text.mednoor.com/profile/' +
                          activeUser.user_picture
                        : 'https://static.turbosquid.com/Preview/001214/650/2V/boy-cartoon-3D-model_D.jpg'
                    "
                    class="rounded-circle user_img_msg"
                  />
                </div>
                <div class="msg_cotainer">
                  {{ message.mess_message }}
                  <!-- <span class="msg_time">9:00 AM, Today</span> -->
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <div class="input-group">
              <div class="input-group-append">
                <span class="input-group-text attach_btn">
                  <i class="mdi mdi-paperclip"></i>
                </span>
              </div>
              <textarea
                name=""
                class="form-control type_msg"
                placeholder="Type your message..."
              ></textarea>
              <div class="input-group-append">
                <span class="input-group-text send_btn">
                  <i class="mdi mdi-send"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import "./index.css";

import axios from "axios";

export default {
  name: "messenger-comp",
  data: () => ({
    myUsers: [],
    messages: [],
    user: false,
    activeUser: false,
    currentConversationId: "",
  }),
  mounted() {
    this.getFriends();

    setInterval(() => {
      if (this.currentConversationId) {
        this.getConversation();
      }
    }, 3000);
  },
  methods: {
    getFriends() {
      this.$store.loader = true;
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          Authorization: "Bearer " + authData.token,
        };
        axios
          .get(`${process.env.VUE_APP_API_URL}/my-professional/my-users`, {
            headers,
          })
          .then((response) => {
            this.myUsers = response.data;
            this.$store.loader = false;
          })
          .catch((e) => {});
      } catch (e) {}
    },
    getConversationId(id) {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          Authorization: "Bearer " + authData.token,
        };
        axios
          .get(
            `${process.env.VUE_APP_API_URL}/conversation/id/${this.$store.auth.user.uuid}/${id}`,
            {
              headers,
            }
          )
          .then((response) => {
            this.currentConversationId = response.data.conversationId;
            this.getConversation();
          })
          .catch((e) => {});
      } catch (e) {}
    },
    getConversation() {
      try {
        let authData = JSON.parse(localStorage.getItem("auth"));
        const headers = {
          Authorization: "Bearer " + authData.token,
        };
        axios
          .get(
            `${process.env.VUE_APP_API_URL}/conversation/messages/${this.currentConversationId}`,
            {
              headers,
            }
          )
          .then((response) => {
            this.user = this.$store.auth.user;
            if (response.data.length > this.messages.length) {
              this.messages = response.data;
              setTimeout(() => {
                this.scroll();
              }, 1);
            }
            if (this.messages.length == 0) {
              this.messages = response.data;
              setTimeout(() => {
                this.scroll();
              }, 1);
            }
          })
          .catch((e) => {});
      } catch (e) {}
    },
    setMessages(user) {
      this.activeUser = user;
      this.getConversationId(user.user_uuid);
    },
    scroll() {
      let container = this.$el.querySelector("#messageBox");
      container.scrollTop = container.scrollHeight;
    },
  },
};
</script>
