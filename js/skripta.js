//API key 2f1fa79393a2b3aaa063a09459d87e54

//API2 d548ce20e978dff19d914467978026961a70f97d4aaf800632f925cdf67b4333

var niz=[];



$.ajax({
    method: "GET",
    url: "https://cryptobojan.000webhostapp.com/poziv.php",
    error: function(xhr, ajaxOptions, thrownError){
        handle_error(xhr, ajaxOptions, thrownError);
        $('#loader').hide();
    },
    success: function(data){
        let result=JSON.parse(data);        
        extract(result.data)
    }


})

function extract(data){
    let result=[];
    for(var i=0; i<data.length; i++){
        result[result.length]={
            "name":data[i].name,
            "symbol":data[i].symbol,
            "price":data[i].quote.USD.price,
            "change":data[i].quote.USD.percent_change_24h
        } 
    }
    
    sortiranje(result);

    return result;
}

  function sortiranje(data){
    
    data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    ispis(data);
  }

  function ispis(data){
    for(let i=0; i<50; i++){
        let span;
        if(data[i].change>0){
             span="good"
        }
        else if(data[i].change<0){
             span="bad"
        }
        $("#results tbody").append(
            "<tr>"+
            "<td>"+data[i].name+"</td>"+
            "<td>"+data[i].symbol+"</td>"+
            "<td id="+data[i].symbol+"_price>"+data[i].price+"</td>"+
            "<td class="+span+">"+ 
            data[i].change+"</td>"+
            "<td><input type='number' class='ammount' id="+data[i].symbol+"><br/><input type='submit' disabled class='submitAmm' val='submit' data-id="+data[i].symbol+"></td>"+
            "<td id='"+data[i].symbol+"_value'>$ 0.0</td>"+
            "</tr>"
        )
    }
    $('#results').show();
    $('.loader').hide();
    loadedDoc();
  }

  function loadedDoc(){

    for (let i in localStorage){
        if (localStorage.hasOwnProperty(i)){
            console.log("#"+i);
            if($("#"+i+"_value").length>0){
                $("#"+i+"_value").html(localStorage.getItem(i) *  $("#"+i+"_price").html());
                $("#"+i).val(localStorage.getItem(i));
                $("#"+i).next().next().prop("disabled", false)
            }
        }
    }

  


      $(".submitAmm").on("click", function(){
            localStorage.setItem(
                $(this).data("id"),
                $("#"+$(this).data("id")).val()
            )

            $("#"+$(this).data("id")+"_value").html(
                localStorage.getItem($(this).data("id"))*$("#"+$(this).data("id")+"_price").html()
            )
      })

      $(".ammount").on("input", function(){
          
          if($(this).val()!=""){
              $(this).next().next().prop("disabled", false);
          }
          else{
            $(this).next().next().prop("disabled", true);
          }
      })

    
  }