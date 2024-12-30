var applyData={
  baseInfo:{
    title:'基本信息',
    name:'baseInfo',
    valid:false,
    fields:{
      first_name_en:{
        name:'first_name_en',
        label:'姓(拼音)',
        type:'InputBox', inputType:'text',
        onKeyup:'',
        value:'',
        pattern:'^[a-zA-Z]+$',
        require:true
      },
      second_name_en:{
        name:'second_name_en',
        label:'名(拼音)',
        type:'InputBox', inputType:'text',
        value:'',
        pattern:'^[a-zA-Z]+$',
        require:true
      },
      old_name:{
        name:'old_name',
        label:'曾用名',
        type:'SelectBox',
        values:[

          {label:'有',value:'1'},
          {label:'无',value:'0'}
        ],
        value:'',
        require:true
      },
      old_name_en:{
        name:'old_name_en',
        label:'曾用姓名(拼音)',
        type:'InputBox',
        inputType:'text',
        className:'level2',
        value:'',
        pattern:'^[a-zA-Z\\s]+$',
        showWhile:[
          {key:'old_name',value:'1'}
        ],
        onKeyup:'',
        require:true
      },
      phone:{
        name:'phone',
        label:'手机号码',
        type:'InputBox',
        inputType:'tel',
        placeholder:'',
        value:'',
        pattern:'^1\\d{10}$',
        maxLength:11,
        require:true
      },
      birthday:{
        name:'birthday',
        label:'出生日期',
        type:'DateBox',
        value:'',
        require:true
      },
      gender:{
        name:'gender',
        label:'性别',
        type:'SelectBox',
        values:[

          {label:'男',value:'0'},
          {label:'女',value:'1'}
        ],
        value:'',
        require:true
      },
      country:{
        name:'country',
        label:'出生国家',
        type:'SelectBox',
        values:getCountries(),
        placeholder:'',
        value:'中国',
        require:true
      },
      province:{
        name:'province',
        label:'出生省份',
        type:'SelectBox',
        values:getPvs(),
        placeholder:'',
        value:'',
        require:true
      },
      race:{
        name:'race',
        label:'种族',
        type:'InputBox',
        inputType:'text',
        placeholder:'',
        value:'CHINESE',
        pattern:'^\\S+$',
        onKeyup:'',
        require:true
      },
      address:{
        name:'address',
        label:'现居地址',
        type:'CityPicker',
        placeholder:'省市区',
        value:'',
        require:true
      },
      address_detail:{
        name:'address_detail',
        label:'详细地址',
        type:'InputBox',
        inputType:'text',
        className:'level2',
        value:'',
        pattern:'^\\S+$',
        placeholder:'精确到门牌号',
        require:true
      },
      marry:{
        name:'marry',
        label:'婚姻状况',
        type:'SelectBox',
        values:[

          {label:'单身',value:'1'},
          {label:'已婚',value:'2'},
          {label:'分居',value:'3'},
          {label:'离婚',value:'4'},
          {label:'丧偶',value:'5'}
        ],
        value:'',
        require:true
      },
      mate_country:{
        name:'mate_country',
        label:'配偶国籍',
        type:'SelectBox',
        className:'level2',
        values:[
          {label:'新加坡公民',value:'1'},
          {label:'新加坡永久公民',value:'2'},
          {label:'其他',value:'0'}
        ],
        placeholder:'',
        hideDistrict:1,
        value:'',
        require:true,
        showWhile:[
          {key:'marry',value:'2'}
        ]
      },
      mate_country_other:{
        name:'mate_country_other',
        label:'其它国籍',
        type:'SelectBox',
        values:getCountries(),
        className:'level2',
        placeholder:'',
        hideDistrict:1,
        value:'中国',
        require:true,
        showWhile:[
          {key:'marry',value:'2'},
          {key:'mate_country',value:'0'}
        ]
      }
    }
  },

  cardInfo:{
    title:'护照信息',
    name:'cardInfo',
    valid:false,
    fields:{
      passport_number:{
        name:'passport_number',
        label:'护照号码',
        type:'InputBox',
        inputType:'text',
        placeholder:'',
        pattern:'^\\S+\\d+$',
        onKeyup:'',
        value:'',
        require:true
      },
      issue_place_cn:{
        name:'issue_place_cn',
        label:'签发地点',
        type:'SelectBox',
        values:getPvs(),
        value:'',
        pattern:'^\\S+$',
        require:true
      },
      other_issue_place_cn:{
        name:'other_issue_place_cn',
        label:'其它地点',
        type:'InputBox',
        inputType:'text',
        placeholder:'请输入地点名称',
        pattern:'^\\S+$',
        value:'',
        className:'level2',
        showWhile:[
          {key:'issue_place_cn',value:'其它'}
        ],
        require:true
      },
      ps_issue_date:{
        name:'ps_issue_date',
        label:'签发日期',
        type:'DateBox',
        value:'',
        pattern:'^\\S+$',
        require:true
      },
      ps_expire_date:{
        name:'ps_expire_date',
        label:'有效日期',
        type:'DateBox',
        value:'',
        pattern:'^\\S+$',
        require:true
      }
    }
  },

  detailInfo:{
    title:'详细信息',
    name:'detailInfo',
    valid:false,
    fields:{
      job: {
        name: 'job',
        label: '职业',
        type: 'SelectBox',
        values: [
          {label: '职员', value: '1'},
          {label: '退休', value: '2'},
          {label: '学生', value: '3'},
          {label: '学龄前儿童', value: '4'},
          {label: '无业', value: '5'},
          {label: '自由职业者', value: '6'}
        ],
        onChange:function(d,f){
          if(d[f.name]==4){
            d.xueli='0';
          }
        }
      },
      xueli: {
        name: 'xueli',
        label: '最高学历',
        type: 'SelectBox',
        require:true,
        values: [
          {label:'无',value:'0'},
          {label: '小学', value: '1'},
          {label: '初中', value: '2'},
          {label: '高中', value: '3'},
          {label: '大学', value: '4'},
          {label: '研究生', value: '5'}
        ]
      },
      belief: {
        name: 'belief',
        label: '宗教信仰',
        type: 'SelectBox',
        require:true,
        values: [
          {label: '无', value: '1'},
          {label: '佛教', value: '2'},
          {label: '伊斯兰教', value: '3'},
          {label: '基督教', value: '4'}
        ]
      },
      arrive:{
        name:'arrive',
        label:'预定到达日期',
        type:'DateBox',
        value:'',
        pattern:'^\\S+$',
        require:true,
        placeholder:''
      },
      target:{
        name:'target',
        label:'访问目的',
        type:'SelectBox',
        values:[

          {label:'旅游',value:'1'},
          {label:'商务',value:'2'}
        ],
        value:'',
        require:true
      },
      other_visit:{
        name:'other_visit',
        label:'五年内在其他国家居留一年以上?',
        type:'SelectBox',
        values:[

          {label:'是',value:'1'},
          {label:'否',value:'0'}
        ],
        value:'',
        pattern:'^\\S+$',
        require:true
      },
      visits_info:{
        name:'visits_info',
        label:'居留信息',
        type:'Popup',
        value:'',
        pattern:'^\\S$',
        className:'level2',
        require:true,
        placeholder:'',
        showWhile:[
          {key:'other_visit',value:1}
        ],
        popup:{
          maxCount:9,
          title:'居留信息',
          name:'visitsData',
          fields:{
            visit_country:{
              name:'visit_country',
              label:'国家',
              type:'SelectBox',
              values:getCountries(),
              value:'中国',
              require:true,
              placeholder:''
            },
            visit_address:{
              name:'visit_address',
              label:'地址',
              type:'InputBox',
              inputType:'text',
              value:'',
              require:true
            },
            visit_start:{
              name:'visit_start',
              label:'停留时间',
              type:'DateBox',
              value:'',
              pattern:'^\\S+$',
              require:true,
              placeholder:''
            },
            visit_end:{
              name:'visit_end',
              label:'           至',
              type:'DateBox',
              value:'',
              className:'level2',
              pattern:'^\\S+$',
              require:true,
              placeholder:''
            }
          }
        }
      },
      any_reject:{
        name:'any_reject',
        label:'任何国家(包括新加坡)拒绝入境或遣返回国?',
        type:'SelectBox',
        values:[

          {label:'是',value:'1'},
          {label:'否',value:'0'}
        ],
        value:'',
        pattern:'^\\S+$',
        require:true
      },
      any_guilt:{
        name:'any_guilt',
        label:'任何国家(包括新加坡)的法律下被宣判有罪?',
        type:'SelectBox',
        values:[

          {label:'是',value:'1'},
          {label:'否',value:'0'}
        ],
        value:'',
        pattern:'^\\S+$',
        require:true
      },
      ever_ban:{
        name:'ever_ban',
        label:'曾被禁止进入新加坡?',
        type:'SelectBox',
        values:[

          {label:'是',value:'1'},
          {label:'否',value:'0'}
        ],
        value:'',
        pattern:'^\\S+$',
        require:true
      },
      ever_ban_time:{
        name:'ever_ban_time',
        label:'拒签时间',
        type:'DateBox',
        value:'',
        pattern:'^\\S+$',
        className:'level2',
        require:true,
        placeholder:'',
        showWhile:[
          {key:'ever_ban',value:'1'}
        ]
      },
      other_name:{
        name:'other_name',
        label:'曾用其他名字或护照进入新加坡?',
        type:'SelectBox',
        values:[

          {label:'是',value:'1'},
          {label:'否',value:'0'}
        ],
        value:'',
        pattern:'^\\S+$',
        require:true
      }
    }
  }
};