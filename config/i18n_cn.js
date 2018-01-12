module.exports = {
    SYS_ERROR_MESSAGE: '系统错误，我们会尽快修复',
    SYS_SUCCESS_MESSAGE: '操作成功',
    SYS_SUCCESS_CODE: 0,
    SYS_ERROR_CODE: 1,

    SYS_LOGIN_AUTH_CODE: 100,
    SYS_LOGIN_AUTH_ERROR: '您还未登录系统，请先登录',

    WECHAT_OPEN_WEBSITE: '请使用微信浏览器打开站点',

    USER_LOGIN_INPUT_ERROR: '您输入的用户名或密码不正确',

    RESPONSE_DATA_ALREADY_EXISTS: '您填写的数据已存在',
    RESPONSE_DATA_NOT_QUERY: '未查询到相关信息',
    REQUEST_INPUT_PARAMS_ERROR: '请求参数有误，请联系系统管理员',

    USER_PASSWORD_INPUT_ERROR: '您输入的密码不正确',
    USER_PASSWORD_NEW_CONFIRM_DIFF: '您输入的新密码与确认密码不一致',
    USER_PASSWORD_NEW_OLD_EQUAL: '您输入的新密码与旧密码一致',
    USER_PASSWORD_OLD_ERROR: '您输入的原始密码错误',

    REQUEST_INPUT_FIELD_MUST: '必传字段',
    REQUEST_INPUT_DATA_EMPTY: '不能为空',
    REQUEST_INPUT_DATA_ERROR: '数据格式错误',
    MODELS_UNDEFIND_FIELD: '验证模型的属性值错误',

    COLLECT_KITCHEN_NAME_EXISTS: '采集的厨房名称已经存在，请重设',
    COLLECT_KITCHEN_CUSTOMERNAME_EXISTS: '采集厨房的客户简称已经存在，请重设',

    COLLECT_KITCHEN_STATUS_FORBID_SUBMIT: '厨房当前状态不可以提交',
    COLLECT_KITCHEN_STATUS_FORBID_EDIT: '厨房当前状态不可以编辑',
    COLLECT_KITCHEN_AREA_HAS_EQUIP: '当前厨房区域下有设备信息',
    COLLECT_KITCHEN_NO_EQUIP: '当前厨房还未添加有效设备信息，无法提交审核',
    COLLECT_EQUIP_STATUS_FORBID_EDIT: '设备当前状态不可以编辑',
    COLLECT_EQUIP_EQUIP_COUNT_ERROR: '设备数量填写不正确',

    // API
    API_SEND_TEMPLATE_MESSAGE_PARAM_FORMAT_ERROR: '您请求的参数格式错误',
    API_WECHAT_MENU_BUTTON_LENGTH_ERROR: '一级按钮下的二级按钮不能为空',
};
