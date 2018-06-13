from selenium import webdriver
from bs4 import BeautifulSoup
import unittest

class BRO_tests(unittest.TestCase):
    def test_wrong_login(self):
        # open page
        browser = webdriver.Chrome()
        browser.get("http://localhost:8080/")
        # get sign-in button
        account_btn = browser.find_element_by_name("account-btn")
        account_btn_value = account_btn.get_attribute("value")
        self.assertEqual(account_btn_value, "Sign in")
        print("\n[SUCCESS] Found sign in button")
        # get buttons in login page
        account_btn.click()
        login_buttons = browser.find_elements_by_tag_name("button")
        self.assertEqual(len(login_buttons), 1)
        print("[SUCCESS] Found buttons in login")
        # click login with all fields empty
        login_btn = login_buttons[0]
        login_btn.click()
        # check if got error message
        error_p = browser.find_element_by_id("no-courses-error")
        self.assertEqual(error_p.text, "login ou senha invalida")
        print("[SUCCESS] Got invalid login element")
        browser.close()

    def test_right_login(self):
        # open page
        browser = webdriver.Chrome()
        browser.get("http://localhost:8080/")
        # get sign-in button
        account_btn = browser.find_element_by_name("account-btn")
        account_btn_value = account_btn.get_attribute("value")
        self.assertEqual(account_btn_value, "Sign in")
        print("\n[SUCCESS] Found sign in button")
        # get buttons in login page
        account_btn.click()
        login_buttons = browser.find_elements_by_tag_name("button")
        self.assertEqual(len(login_buttons), 1)
        print("[SUCCESS] Found buttons in login")
        # find input elements and check if there are two
        inputs = browser.find_elements_by_class_name("text-input-single-line")
        self.assertEqual(len(inputs), 2)
        print("[SUCCESS] Found two input elements in login page")
        # get input names and type account information (account should be already registered)
        inputs = [(i, i.get_attribute("name")) for i in inputs]
        for i, name in inputs:
            if name == 'email':
                i.send_keys("maria@gmail.com")
            elif name == 'password':
                i.send_keys("m1234")
            else:
                print("[FAIL] Unexpected element name in login")
        # click login and get account buttons
        login_btn = login_buttons[0]
        login_btn.click()
        print("[CHECKPOINT] Login executed")
        account_btns = browser.find_elements_by_name("account-btn")
        self.assertEqual(len(account_btns), 2)
        print("[SUCCESS] Found two account buttons on main page after login")
        account_btns_values = [i.get_attribute("value") for i in account_btns]
        self.assertEqual(account_btns_values[0], "Torne-se um instrutor")
        print("[SUCCESS] Found \'Torne-se um instrutor\' button")
        self.assertEqual(account_btns_values[1], "Minha Conta")
        print("[SUCCESS] Found \'Minha Conta\' button")
        # if code reached this point, login was certainly successful
        print("[SUCCESS] Login worked correctly")
        browser.close()

unittest.main(exit=False)
print("\nFinished running tests")
