require 'test_helper'

class BreweriesControllerTest < ActionController::TestCase
  setup do
    @brewery = breweries(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:breweries)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create brewery" do
    assert_difference('Brewery.count') do
      post :create, brewery: { address: @brewery.address, city: @brewery.city, country: @brewery.country, desc: @brewery.desc, food: @brewery.food, lat: @brewery.lat, lon: @brewery.lon, name: @brewery.name, postcode: @brewery.postcode, seasonal: @brewery.seasonal, state: @brewery.state, take_home: @brewery.take_home, tour: @brewery.tour }
    end

    assert_redirected_to brewery_path(assigns(:brewery))
  end

  test "should show brewery" do
    get :show, id: @brewery
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @brewery
    assert_response :success
  end

  test "should update brewery" do
    patch :update, id: @brewery, brewery: { address: @brewery.address, city: @brewery.city, country: @brewery.country, desc: @brewery.desc, food: @brewery.food, lat: @brewery.lat, lon: @brewery.lon, name: @brewery.name, postcode: @brewery.postcode, seasonal: @brewery.seasonal, state: @brewery.state, take_home: @brewery.take_home, tour: @brewery.tour }
    assert_redirected_to brewery_path(assigns(:brewery))
  end

  test "should destroy brewery" do
    assert_difference('Brewery.count', -1) do
      delete :destroy, id: @brewery
    end

    assert_redirected_to breweries_path
  end
end
