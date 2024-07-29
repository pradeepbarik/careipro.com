const get_env_configs = () => {
  let api_base_url = "",
    node_endpoint = "",
    socket_connection_end_point;
  if (process.env.mode === "production") {
    api_base_url = "https://careipro.com";
    node_endpoint = "https://careipro.com:9000";
    socket_connection_end_point = "https://careipro.com:9000/online-consulting";
  } else {
     api_base_url = "http://localhost:8080/doctorapp";
     node_endpoint = "http://localhost:9010";
     socket_connection_end_point = "http://localhost:9010/online-consulting";
     // api_base_url = "https://careipro.com";
     // node_endpoint = "https://careipro.com:9000";
     // socket_connection_end_point = "https://careipro.com:9000/online-consulting";
  }
  return {
    customer_app_api: api_base_url + "/webservice/v1/patient-app/",
    customer_app_node_api: node_endpoint + "/customer-app/",
    graphql_endpoint: node_endpoint + "/customerappgraphql",
    socket_connection_end_point: socket_connection_end_point
  };
};
export const {
  customer_app_api,
  graphql_endpoint,
  customer_app_node_api,
  socket_connection_end_point
} = get_env_configs();
export const popular_doctors_api = customer_app_api + "popular-doctors";
export const get_specialists_api = customer_app_api + "get-specialists";
export const get_doctor_search_suggestions =
  customer_app_api + "get-doctor-search-suggestions";
export const send_login_otp_api = customer_app_api + "send-login-otp";
export const generate_otp_api = customer_app_api + "generate-otp";
export const login_with_otp_api = customer_app_api + "login";
export const signup_api = customer_app_api + "signup";
export const get_doctor_detail_api =
  customer_app_node_api + "get-doctor-detail";
export const booking_api = customer_app_api + "booking";
export const get_personal_detail_api = customer_app_api + "get-personal-detail";
export const update_profile_api = customer_app_api + "update-profile";
export const get_all_state_api = customer_app_api + "get-all-state";
export const get_distrcts_api = customer_app_node_api + 'districts';
export const get_cities_api = customer_app_api + "get-cities/";
export const get_sub_district_api = customer_app_node_api+'sub-districts';
export const get_village_list_api = customer_app_node_api+'village-list';
export const upload_profile_pic = customer_app_api + "upload-profile-pic";
export const serach_location_api = customer_app_node_api + "search-location";
export const location_detail_api =
  customer_app_node_api + "get-location-detail";
export const upload_precription_api = customer_app_api + "upload-precription";
export const delete_precription_api = customer_app_api + "delete-precription";
export const get_clinic_seo_detail_api =
  customer_app_node_api + "get-clinic-seo-detail";
export const validate_incoming_call_request_api =
  customer_app_node_api + "validate-incoming-call-request";
export const log_site_visiter_information =
  customer_app_node_api + "log-site-visiter-information";
export const specility_seo_detail_api =
  customer_app_node_api + "get-specility-seo-detail";
export const diseases = customer_app_node_api + "diseases";
export const get_next_consult_date_api =
  customer_app_node_api + "get-next-consult-date";
export const upcoming_booking_reminder =
  customer_app_api + "upcoming-booking-reminder/";
export const log_clinic_visiter_info_api =
  customer_app_node_api + "log-clinic-visiter-info";
export const log_clinic_profile_visiter_info=customer_app_node_api+'log-clinic-profile-visiter-info';
  export const update_ask_for_booking_feedback= customer_app_node_api + "update-ask-for-booking-feedback"
export const sent_booking_confirmation_sms = customer_app_node_api+ "sent-booking-confirmation-sms";
export const generate_user_secreate_key_api = customer_app_node_api+"user/get-user-secreate-key";
export const check_user_address_status_api = customer_app_node_api+"user/check-user-address-status";
export const save_user_address_api = customer_app_node_api+"user/update-user-address";
export const log_user_visit_api = customer_app_node_api+"user/log-user-visit-info";
export const register_guest_user_api = customer_app_node_api+"register-guest-user";
export const log_guser_visit_info_api = customer_app_node_api+"log-guser-visit-info";
export const save_guser_search_location_api = customer_app_node_api+"save-guser-search-locations";
export const save_user_search_location_api= customer_app_node_api+"user/save-user-search-locations"
export const add_village_request_api =customer_app_node_api+"add-village-request";